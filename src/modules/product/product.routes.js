import { Router } from "express";
import * as productController from './controller/product.controller.js'
import { multerCloudinary } from "../../utils/multerCloudinary.js";
import { validExtention } from "../../utils/validExtention.js";
import { auth } from "../../middleware/auth.js";
import productEndPoints from "./product.endPoints.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import validation from "../../utils/validation.js";
import * as productValidation from './product.validation.js'
const router=Router()
 
router.post('/',
            auth(productEndPoints.create),  
            validation(productValidation.tokenSchema,true),    
            multerCloudinary(validExtention.image).fields([
                {name:"mainImage",maxCount:1},
                {name:"subImages",maxCount:5} 
                ]),
            validation(productValidation.creatProductSchema), 
            asyncHandler(productController.createProduct))

        .get('/',
            productController.getAllProducts)

        .get('/:productId',
            validation(productValidation.getProductSchema),
            asyncHandler(productController.getOneProduct))

        .put('/updateProduct/:productId', 
            validation(productValidation.tokenSchema,true),    
            auth(productEndPoints.update),  
            multerCloudinary(validExtention.image).fields([
             {name:"mainImage",maxCount:1},
             {name:"subImages",maxCount:5} 
             ]),
            validation(productValidation.updateProductSchema),
            asyncHandler(productController.updateProduct))

        .delete('/deleteProduct/:productId',
            validation(productValidation.tokenSchema,true),    
            auth(productEndPoints.delete),
            validation(productValidation.deleteProductSchema),
            asyncHandler(productController.deleteProduct))
          
           
     
export default router
