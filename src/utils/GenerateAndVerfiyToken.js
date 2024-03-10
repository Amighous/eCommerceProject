import  jwt  from "jsonwebtoken";

export const generateToken=({payload={}, signture=process.env.TOKEN_SIGNTURE ,expiresIn=60*60}={})=>{
    const token = jwt.sign(payload,signture,{expiresIn:parseInt(expiresIn)})
    return token
} 

export const verfiyToken=({token, signture=process.env.TOKEN_SIGNTURE }={})=>{
    const decoded = jwt.verify(token,signture)
    return decoded
} 