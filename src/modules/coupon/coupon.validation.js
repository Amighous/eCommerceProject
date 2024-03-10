import joi from 'joi'
import { generalFileds } from '../../utils/generalFileds.js'

export const createCouponSchema=joi.object({
    name:generalFileds.name.required(),
    amount:joi.number().positive().min(1).max(100).required(),
    expireIn:joi.date().greater(new Date()).required(),
    file:generalFileds.file
})
export const oneCouponSchema=joi.object({
    couponId:generalFileds.id
    
})
export const deleteCouponSchema=joi.object({
    couponId:generalFileds.id
    
})
export const updateCouponSchema=joi.object({
    couponId:generalFileds.id,
    name:generalFileds.name,
    amount:joi.number().positive().min(1).max(100),
    expireIn:joi.date().greater(new Date()),
    file:generalFileds.file
})
export const tokenSchema = joi.object({
    authorization:joi.string().required()
}).required()
 