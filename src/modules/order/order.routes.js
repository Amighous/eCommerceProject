import { Router } from "express";
import * as orderController from './controller/order.controller.js'
import { asyncHandler } from "../../utils/errorHandling.js";
import * as orderValidation from './order.validation.js'
import { auth } from "../../middleware/auth.js";
import orderEndPoints from "./order.endPoints.js";
import validation from "../../utils/validation.js";
const router=Router()
 
router.post('/',
            validation(orderValidation.tokenSchema,true),
            auth(orderEndPoints.createOrder),
            validation(orderValidation.createOrderSchema),
            asyncHandler(orderController.createOrder))

      .put('/cancelOrder/:orderId',
            validation(orderValidation.tokenSchema,true),
            auth(orderEndPoints.cancelOrder),
            validation(orderValidation.validIdSchema),
            asyncHandler(orderController.cancelOrder))

      .put('/delviredOrder/:orderId',
            validation(orderValidation.tokenSchema,true),
            auth(orderEndPoints.deliverdOrder),
            validation(orderValidation.validIdSchema),
            asyncHandler(orderController.delviredOrder))
      .put('/onWayOrder/:orderId',
            validation(orderValidation.tokenSchema,true),
            auth(orderEndPoints.onWayOrder),
            validation(orderValidation.validIdSchema),
            asyncHandler(orderController.onWayOrder))

      .put('/rejectOrder/:orderId',
            validation(orderValidation.tokenSchema,true),
            auth(orderEndPoints.rejectOrder),
            validation(orderValidation.validIdSchema),
            asyncHandler(orderController.rejectOrder))

      .get('/',
            validation(orderValidation.tokenSchema,true),
            auth(orderEndPoints.allOrders),
            asyncHandler(orderController.allOrders))

      .get('/allUserOrders',
            validation(orderValidation.tokenSchema,true),
            auth(orderEndPoints.allUserOrders),
            asyncHandler(orderController.allUserOrders))

     
export default router
