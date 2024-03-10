import joi from "joi";
import { generalFileds } from "../../utils/generalFileds.js";

export const tokenSchema = joi.object({
    authorization:joi.string().required()
}).required()
  
export const addToCartSchema=joi.object({
productId:generalFileds.id,
quantity:joi.number().positive().integer().min(1).required()
}).required()

export const removeFromCartSchema=joi.object({
productId:generalFileds.id,
}).required()