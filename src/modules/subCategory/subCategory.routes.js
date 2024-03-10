import { Router } from "express";
import * as subCategoryController from './controller/subCategory.controller.js'
import * as subCategoryValidation from './subCategory.validation.js'
import { validExtention } from "../../utils/validExtention.js";
import { multerCloudinary } from "../../utils/multerCloudinary.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import validation from "../../utils/validation.js";
import { auth, roles } from "../../middleware/auth.js";
const router=Router({mergeParams:true})

router.post('/',          
            validation(subCategoryValidation.tokenSchema,true),
            auth(roles.Admin),
            multerCloudinary(validExtention.image).single('image'),
            validation(subCategoryValidation.createSubCategorySchema),
            asyncHandler(subCategoryController.createSubCategory))

    .get('/',asyncHandler(subCategoryController.allSubCategories))

    .get('/:subCategoryId', 
            validation(subCategoryValidation.oneSubCategorySchema),
            asyncHandler(subCategoryController.oneSubCategory))
         
    .put('/updateSubCategory/:subCategoryId', 
            validation(subCategoryValidation.tokenSchema,true),
            auth(roles.Admin),
            multerCloudinary(validExtention.image).single('image'),
            validation(subCategoryValidation.updateSubCategorySchema),
            asyncHandler(subCategoryController.updateSubCategory))

    .delete('/deleteSubCategory/:subCategoryId',           
            validation(subCategoryValidation.tokenSchema,true),
            auth(roles.Admin),
            validation(subCategoryValidation.deleteSubCategorySchema),
            asyncHandler(subCategoryController.deleteSubCategory))
              
 
 
export default router 