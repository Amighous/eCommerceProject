import joi from "joi";
import { generalFileds } from "../../utils/generalFileds.js";

export const createSubCategorySchema = joi.object({
name:generalFileds.name.required(),
file:generalFileds.file.required(),
categoryId:generalFileds.id

}).required()



export const oneSubCategorySchema = joi.object({
    categoryId:generalFileds.id,
    subCategoryId:generalFileds.id
}).required()

export const deleteSubCategorySchema = joi.object({
    categoryId:generalFileds.id,
    subCategoryId:generalFileds.id
}).required()


export const updateSubCategorySchema = joi.object({
    name:generalFileds.name,
    file:generalFileds.file,
    categoryId:generalFileds.id,
    subCategoryId:generalFileds.id

}).required()

export const tokenSchema = joi.object({
    authorization:joi.string().required()
}).required()
 

