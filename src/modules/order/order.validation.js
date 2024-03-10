import joi from "joi";
import { generalFileds } from "../../utils/generalFileds.js";

export const tokenSchema = joi.object({
    authorization:joi.string().required()
}).required()
  
export const createOrderSchema=joi.object({
    address:joi.string().min(10).max(100).required(),
    phoneNumber:joi.array().items(joi.string().regex(/^01[0125]\d{8}$/).required()).required(),
    note:joi.string().min(5).max(200),
    paymentType:joi.string().valid('cash','visa'),
    couponName:generalFileds.name,
    products:joi.array().items(joi.object({
        productId:generalFileds.id,
        quantity:joi.number().positive().integer().min(1).required()
    }).required()),
 
    
}).required()

export const validIdSchema=joi.object({
    orderId:generalFileds.id,
}).required()