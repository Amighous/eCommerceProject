export const validation = (schema,containHeaders = false)=>{
  return (req,res,next)=>{

    let data={...req.body,...req.params,...req.query}

    if(req.headers.authorization&&containHeaders){
        data={authorization:req.headers.authorization}
    }

    
    if(req.file){
        data.file=req.file
    } 

    if(req.files){
        data.files=req.files
    }
    const validationResult=schema.validate(data,{abortEarly:false})
    
    if(validationResult.error){
        req.validationError=validationResult.error
        return next (new Error("validation error ",{cause:400}))
    }
    return next()
}}

export default validation

