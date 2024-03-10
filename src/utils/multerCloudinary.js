import multer from "multer";


export const multerCloudinary= (customValidation)=>{

    if (!customValidation){
        customValidation=validExtention.image
    }

    const storage = multer.diskStorage({})

    const fileFilter = function (req, file, cb) {
        if(customValidation.includes(file.mimetype)){
            return cb(null,true)
        }
        cb(new Error('invalid type') , false)
 
    }
 
    const upload = multer({ fileFilter, storage })
    return upload

}  