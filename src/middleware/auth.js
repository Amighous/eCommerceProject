import jwt from 'jsonwebtoken'
import userModele from '../DB/models/user.model.js'

export const roles={
Admin:'Admin',
User:'User',
}
export const auth =(role)=>{
return async(req,res,next)=>{
  const {authorization}=req.headers
    if (!authorization){
        return next(new Error("please login",{cause:400}))
    }
    if (!authorization?.startsWith(process.env.BEARER_KEY)){
        return next(new Error("invalid bearer key",{cause:400}))
    }

  const token = authorization.split(process.env.BEARER_KEY)[1] 

  
    
    if(!token){
      return next(new Error("invalid Bearer key"))
    }   

  const payload = jwt.verify(token,process.env.TOKEN_SIGNTURE)
    if (!payload?._id) { 
        return next(new Error('invalid payload')) 
    }
   
  const user = await userModele.findById({ _id: payload._id }).select('userName email status role passwordChangedAt')
  if (!user) {
      return next(new Error('account not register',{cause:404}))
  }

const date = new Date(user.passwordChangedAt);
const timestamp = date.getTime();

  if (payload.iniateAt < timestamp) { 
    return next(new Error('not valid token')) 
  }

  if (user.status == "offline") {
    return next(new Error('please login',{cause:400}))
  }
  if (!role.includes(user.role)){
    return next(new Error('you do not have access',{cause:401}))
  }
  req.user = user

  return next()
}
}

  