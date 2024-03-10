import { Router } from "express";
import { asyncHandler } from "../../utils/errorHandling.js";
import validation from "../../utils/validation.js";
import * as authValidation from './auth.validation.js'
import * as authController from './controller/auth.controller.js'
 
const router=Router()
 

router.post('/signUp',
            validation(authValidation.signUpSchema),
            asyncHandler(authController.signUp))

    .get('/confirmEmail/:token',     
            validation(authValidation.tokenSchema),
            asyncHandler(authController.confirmEmail))

    .get('/refreshEmail/:token',     
            validation(authValidation.tokenSchema),
            asyncHandler(authController.refreshEmail))
    .get('/logIn',     
            validation(authValidation.logInSchema),
            asyncHandler(authController.logIn))
    .patch('/sendCode',     
            validation(authValidation.sendCodeSchema),
            asyncHandler(authController.sendCode))
    .put('/forgetPassword',     
            validation(authValidation.forgetPasswordSchema),
            asyncHandler(authController.forgetPassword))

   
export default router