import userModel from "../../../DB/models/user.model.js";
import { hash, verfiy } from "../../../utils/hashing.js";

 


export const updateUser = async(req,res,next)=>{
  const { _id } = req.user
  const { email , phoneNumber , recoveryEmail  , userName , DOB} = req.body;
  const user = await userModel.findOne({email})

  //check if email exist
  if(user.email !=req.user.email ){
    return next(new Error("email already exist"))
  }

  const userupdate = await userModel.findByIdAndUpdate(_id, { email , phoneNumber , userName , recoveryEmail ,DOB}, { new: true });
   return res.json({ message: 'User updated successfully', userupdate });
} 





///////////delete//////////
export const deleteUser = async(req,res,next)=>{
  const { _id } = req.user
  const userDelete = await userModel.updateOne( {_id} ,{isDeleted:true})
  
    return res.json({ message: 'User deleted successfully' })
}


///////Get user account data //////////
export const getUserData =async(req,res,next)=>{
  const { _id } = req.user
  const user = await userModel.find(_id).select(' -password' )
  return res.json({message:'done',user})
}

 

//////Get profile data for another user ////
export const getAnotherAccount =async(req,res,next)=>{
  const { email } = req.body
  const user = await userModel.findOne({ email })
            .select('status phoneNumber DOB _id userName email')
  if (!user){
    return next(new Error("User not found"))
  }
  return res.json({message:'done',user})
}



/////////update password//////////////
export const updatePassword= async (req, res, next) => {
    const { _id } = req.user
    const { oldPassword, newPassword } = req.body;
    const userchange = await userModel.findById({_id});
    const match =verfiy({plainText:oldPassword,hashValue:userchange.password})
    if(!match){
        return  next(new Error('Invalid old password',{cause:404}))

    }    
    
    let password=hash({plainText:newPassword})
    const updateUser = await userModel.findOneAndUpdate({_id},{password,passwordChangedAt: Date.now(),status:"offline"},{new:true})
    return  res.json({ message: 'Password updated successfully' });
}








  

