import { Router } from "express";
import { validExtention } from "../../utils/validExtention.js";
import { multerCloudinary } from "../../utils/multerCloudinary.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import validation from "../../utils/validation.js";
import * as categoryValidation from './category.validation.js'
import * as categoryController from './controller/category.controller.js'
import subCategoryRouterRouter from'../subCategory/subCategory.routes.js'
import  {auth, roles } from "../../middleware/auth.js";

const router=Router()
router.use('/:categoryId/subCategory',subCategoryRouterRouter)


router.post('/',
          validation(categoryValidation.tokenSchema,true),
          auth(roles.Admin),
          multerCloudinary(validExtention.image).single('image'),
          validation(categoryValidation.createCategorySchema),
          asyncHandler(categoryController.createCategory))

    .get('/',
           asyncHandler(categoryController.allCategories))

    .get('/:categoryId', 
         validation(categoryValidation.oneCategorySchema),
         asyncHandler(categoryController.oneCategory))
          
    .put('/updateCategory/:categoryId',
            validation(categoryValidation.tokenSchema,true),
            auth(roles.Admin),
            multerCloudinary(validExtention.image).single('image'),
            validation(categoryValidation.updateCategorySchema),
            asyncHandler(categoryController.updateCategory))
    
    .delete('/deleteCategory/:categoryId',
            validation(categoryValidation.tokenSchema,true),
            auth(roles.Admin),
            validation(categoryValidation.deleteCategorySchema),
             categoryController.deleteCategory)  
            
     

export default router