import {Router} from 'express'
import * as userController from './controller/user.controller.js'
import { auth } from '../../middleware/auth.js';
import { asyncHandler } from '../../utils/errorHandling.js';
import userEndPoints from './user.endPoints.js';
const router=Router()
router.patch('/updateUser',auth(userEndPoints.update),asyncHandler(userController.updateUser));
router.delete('/deleteUser',auth(userEndPoints.delete),asyncHandler(userController.deleteUser))
router.get('/getUserData',auth(userEndPoints.get),asyncHandler(userController.getUserData))
router.get('/getAnotherAccount',auth(userEndPoints.get),asyncHandler(userController.getAnotherAccount))
router.patch('/updatePassword',auth(userEndPoints.update),asyncHandler(userController.updatePassword))

export default router 

 
 