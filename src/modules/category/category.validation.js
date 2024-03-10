import joi from "joi";
import { generalFileds } from "../../utils/generalFileds.js";


export const createCategorySchema = joi.object({
name:generalFileds.name.required(),
file:generalFileds.file.required(),
}).required()


export const tokenSchema = joi.object({
    authorization:joi.string().required()
}).required()
 

export const oneCategorySchema = joi.object({
    categoryId:generalFileds.id
}).required().messages({
    'custom':"invalid-id"
})

export const deleteCategorySchema = joi.object({
    categoryId:generalFileds.id
}).required()

export const updateCategorySchema = joi.object({
    name:generalFileds.name,
    file:generalFileds.file,
    categoryId:generalFileds.id
}).required()


