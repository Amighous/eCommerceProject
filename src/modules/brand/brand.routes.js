import { Router } from "express";
import { validExtention } from "../../utils/validExtention.js";
import { multerCloudinary } from "../../utils/multerCloudinary.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import validation from "../../utils/validation.js";
import * as brandValidation from './brand.validation.js'
import * as brandController from './controller/brand.controller.js'
import { auth, roles } from "../../middleware/auth.js";
 
const router=Router()
 

router.post('/',
          validation(brandValidation.tokenSchema,true),
          auth(roles.Admin),
          multerCloudinary(validExtention.image).single('image'),
          validation(brandValidation.createBrandSchema),
          asyncHandler(brandController.createBrand))

    .get('/',
          asyncHandler(brandController.allBrands))

    .get('/:brandId', 
         validation(brandValidation.oneBrandSchema),
         asyncHandler(brandController.onebrand))
         
    .put('/updateBrand/:brandId',
          validation(brandValidation.tokenSchema,true),
          auth(roles.Admin),
          multerCloudinary(validExtention.image).single('image'),
          validation(brandValidation.updateBrandSchema),
          asyncHandler(brandController.updateBrand))
    
     .delete('/deleteBrand/:brandId', 
            validation(brandValidation.tokenSchema,true),
            auth(roles.Admin),
            validation(brandValidation.deleteBrandSchema),
            asyncHandler(brandController.deleteBrand))
            
 
export default router