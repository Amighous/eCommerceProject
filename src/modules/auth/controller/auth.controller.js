import { customAlphabet } from "nanoid"
import userModel from "../../../DB/models/user.model.js"
import { generateToken, verfiyToken } from "../../../utils/GenerateAndVerfiyToken.js"
import sendEmail from "../../../utils/email.js"
import { hash, verfiy } from "../../../utils/hashing.js"


export const signUp=  async (req,res,next)=>{
    const {email}=req.body
    const emailExist= await userModel.findOne({email})
    if(emailExist){
        return next(new Error('email already exist',{cause:409}))
    }


    const token = generateToken({payload:{email},signture:process.env.EMAIL_SIGNTURE,expiresIn:60*30})
    
        const link=`${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
    
    const refreshToken = generateToken({payload:{email},signture:process.env.EMAIL_SIGNTURE,expiresIn:60*30*24})

        const refreshLink=`${req.protocol}://${req.headers.host}/auth/refreshEmail/${refreshToken}`
    
    const html = `
    <a href=${link} style="color :red;"> confirm email </a>
    <br>
    <br>
    <a href=${refreshLink} style="color :red;"> send new email </a>
    `

    if( !sendEmail({ to:email,subject:"confirm email",html})){
        return next(new Error('failed to send email',{cause:400}))
    }
    req.body.password=hash({plainText:req.body.password})
    const user = await userModel.create(req.body)
    return res.json({message:'done',_id:user._id})

}   

export const confirmEmail=async (req,res,next)=>{
    const {token}=req.params
    const {email}=verfiyToken({token,signture:process.env.EMAIL_SIGNTURE})
    const user = await userModel.findOne({email})
    //in redirection should be link 
    if(!user){
    
        return res.redirect('https://github.com/signup?source=login')

    }

    if(user.confirmEmail){
        return res.redirect('https://github.com/login')

    }

    await userModel.updateOne({email},{confirmEmail:true})
    return res.redirect('https://github.com/login')

}

export const refreshEmail=async (req,res,next)=>{
    const {token}=req.params
    const {email}=verfiyToken({token,signture:process.env.EMAIL_SIGNTURE})
    const user = await userModel.findOne({email})
    if(!user){
    
        return res.redirect('https://github.com/signup?source=login')

    }

    if(user.confirmEmail){
        return res.redirect('https://github.com/login')

    }
    const newToken = generateToken({payload:{email},signture:process.env.EMAIL_SIGNTURE,expiresIn:60*30})
    const link=`${req.protocol}://${req.headers.host}/auth/confirmEmail/${newToken}`
    const html = `<a href=${link} style="color :red;"> confirm email </a>`
    if( !sendEmail({ to:email,subject:"confirm email",html})){
        return next(new Error('failed to send email',{cause:400}))
    }
    return res.send('<h1>check your email </h1>')

}

export const logIn=async (req,res,next)=>{
    const {email,password}=req.body
    const user = await userModel.findOne({email})
    if(!user){
        return  next(new Error('email or password not valid',{cause:404}))
    }
 
    if(!user.confirmEmail){
        return next(new Error('please confirm your email',{cause:400}))

    }
const match =verfiy({plainText:password,hashValue:user.password})
    if(!match){
        return  next(new Error('email or password not valid',{cause:404}))

    }
    if(user.isDeleted){
        user.isDeleted=false
    }
    
    const token = generateToken({payload:{email,_id:user._id,role:user.role,iniateAt:Date.now()},expiresIn:60*30})
    const refreshToken = generateToken({payload:{email,_id:user._id,role:user.role,iniateAt:Date.now()},expiresIn:60*60*30*24})
    user.status="online"
    await user.save()
return res.status(200).json({message:"done",token,refreshToken})
}

export const sendCode=async(req,res,next)=>{
    const {email}=req.body
    const user=await userModel.findOne({email})
    if(!user){
        return next(new Error('invalid email',{cause:404}))

    }
    if(!user.confirmEmail){
        return next(new Error('please confirm your email',{cause:400}))

    }
    const nanid = customAlphabet('1234567890', 6)
    const code=nanid()
    if( !sendEmail({ to:email,subject:"forget password",html:`<h1>${code}</h1>`})){
        return next(new Error('failed to send email',{cause:400}))
    }
    await userModel.findOneAndUpdate({email},{code})
    return res.json({message:'check your email'})

}
export const forgetPassword = async (req,res,next)=>{
    const {email,code}=req.body
    const user=await userModel.findOne({email})

    if(!user){
        return next(new Error('invalid email',{cause:404}))
    }

    if(code!=user.code){
        return next(new Error('code invalid ',{cause:404}))
    }
    let password=hash({plainText:req.body.password})
    const updateUser = await userModel.findOneAndUpdate({email},{password,code:null,passwordChangedAt: Date.now(),status:"offline"},{new:true})
    return res.status(200).json({message:'done',updateUser})

}