import joi  from "joi";
import { Types } from "mongoose"

export const validationObjectId=(value,helper)=>{
    return Types.ObjectId.isValid(value)?true:helper.message('invalid format of id')  
}

export const generalFileds={
authorization:joi.string().required(),
id:joi.string().custom(validationObjectId).required(),
_id:joi.string().custom(validationObjectId),
name:joi.string().min(3).max(20),
email: joi.string().email({  tlds: { allow: ['com', 'net'] } }).required(),
password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
gender:joi.string().valid('male','female'),
cPassword:joi.string().valid(joi.ref("password")).required(), 

file: joi.object({
    size: joi.number().positive().required(),
    path: joi.string().required(),
    filename: joi.string().required(),
    destination: joi.string().required(),
    mimetype: joi.string().required(), 
    encoding: joi.string().required(),
    originalname: joi.string().required(),
    fieldname: joi.string().required()
    })
}

