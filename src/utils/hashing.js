import bcrybt from'bcryptjs'

export const hash = ({plainText,salt=process.env.SALT_ROUND}={})=>{
    const hashResult=bcrybt.hashSync(plainText,parseInt(salt))
    return hashResult
}
export const verfiy = ({plainText,hashValue}={})=>{
    const verfiyResult=bcrybt.compareSync(plainText,hashValue)
    return verfiyResult
} 