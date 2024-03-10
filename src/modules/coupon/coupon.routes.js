import { Router } from "express";
import { validExtention } from "../../utils/validExtention.js";
import { multerCloudinary } from "../../utils/multerCloudinary.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import validation from "../../utils/validation.js";
import * as couponValidation from './coupon.validation.js'
import * as couponController from './controller/coupon.controller.js'
import { auth, roles } from "../../middleware/auth.js";
 
const router=Router()

 
router.post('/',
          validation(couponValidation.tokenSchema,true),
          auth(roles.Admin),
          multerCloudinary(validExtention.image).single('image'),
          validation(couponValidation.createCouponSchema),
          asyncHandler(couponController.createCoupon))

    .get('/',
          asyncHandler(couponController.allCoupons))

    .get('/:couponId',
         validation(couponValidation.oneCouponSchema),
         asyncHandler(couponController.oneCoupon))
         
    .put('/updateCoupon/:couponId',
            validation(couponValidation.tokenSchema,true),
            auth(roles.Admin),
            multerCloudinary(validExtention.image).single('image'),
            validation(couponValidation.updateCouponSchema),
            asyncHandler(couponController.updateCoupon))
            
   .delete('/deleteCoupon/:couponId', 
            validation(couponValidation.tokenSchema,true),
            auth(roles.Admin),
            validation(couponValidation.deleteCouponSchema),
            asyncHandler(couponController.deleteCoupon))
            
            
 
export default router