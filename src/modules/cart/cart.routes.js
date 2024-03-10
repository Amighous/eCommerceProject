import * as cartController from './controller/cart.controller.js'
import * as cartValidation from './cart.validation.js'
import { auth } from '../../middleware/auth.js';
import { asyncHandler } from '../../utils/errorHandling.js';
import cartEndPoints from './cart.endPoints.js';
import {Router} from 'express'
import validation from '../../utils/validation.js';

const router=Router()
 
router.post('/',
            validation(cartValidation.tokenSchema,true),    
            validation(cartValidation.addToCartSchema),    
            auth(cartEndPoints.cart),
            asyncHandler(cartController.addCart))
            
      .patch('/:productId',
            validation(cartValidation.tokenSchema,true),    
            auth(cartEndPoints.cart),
            validation(cartValidation.removeFromCartSchema),    
            asyncHandler(cartController.removeFromCart))

      .get('/',
            validation(cartValidation.tokenSchema,true),    
            auth(cartEndPoints.cart),
            asyncHandler(cartController.getAllCart))

     .patch('/',
            validation(cartValidation.tokenSchema,true),    
            auth(cartEndPoints.cart),
            asyncHandler(cartController.removeAllProducts));


export default router 

 
 