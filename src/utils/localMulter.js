import multer from "multer";
import { customAlphabet } from "nanoid";
import path from "path";
import fs from 'fs'
const uniqueNumber=customAlphabet('123456789',5)



export const localMulter= (customValidation,customPath)=>{

    if (!customValidation){
        customValidation=validExtention.image
    }

    if (!customPath){
        customPath="general"
    }

    const destPath=path.resolve(`uploads/${customPath}`)

    if(!fs.existsSync(destPath)){
        fs.mkdirSync(destPath,{recursive:true})
    }


    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, destPath)
        },
        filename: function (req, file, cb) {
        const uniqueName=uniqueNumber()+file.originalname
        cb(null, uniqueName)
        }
      })
      const fileFilter = function (req, file, cb) {
        if(customValidation.includes(file.mimetype)){
            return cb(null,true)
        }
        cb(new Error('invalid type') , false)
      
        
      
      }

      
      const upload = multer({ fileFilter, storage })
      return upload

}