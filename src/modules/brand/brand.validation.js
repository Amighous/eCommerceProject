import joi from "joi";
import { generalFileds } from "../../utils/generalFileds.js";


export const createBrandSchema = joi.object({
name:generalFileds.name.required(),
file:generalFileds.file.required()
}).required()


export const oneBrandSchema = joi.object({
    brandId:generalFileds.id
}) 
export const deleteBrandSchema = joi.object({
    brandId:generalFileds.id
}) 


export const updateBrandSchema = joi.object({
    name:generalFileds.name,
    file:generalFileds.file,
    brandId:generalFileds.id
}).required()

export const tokenSchema = joi.object({
    authorization:joi.string().required()
}).required()
 

