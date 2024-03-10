import joi from "joi";
import { generalFileds } from "../../utils/generalFileds.js";
export const tokenSchema = joi.object({
    authorization:joi.string().required()
}).required()
  
export const creatProductSchema=joi.object({
name:generalFileds.name.required(),
categoryId:generalFileds.id,
subCategoryId:generalFileds.id,
brandId:generalFileds.id,
price:joi.number().min(1).positive().required(),
discount:joi.number().min(1).max(100).positive(),
stock:joi.number().integer().min(1).positive().required(),
files:joi.object({
mainImage:joi.array().items(generalFileds.file.required()).required(),
subImages:joi.array().items(generalFileds.file)
}).required(),
description:joi.string().min(5).max(1000),
size:joi.array().items(joi.string().required()),
colors:joi.array().items(joi.string().required())
}).required()

export const getProductSchema=joi.object({
    productId:generalFileds.id
})
export const deleteProductSchema=joi.object({
    productId:generalFileds.id
})

export const updateProductSchema=joi.object({
    productId:generalFileds.id,
    name:generalFileds.name,
    categoryId:generalFileds._id,
    subCategoryId:generalFileds._id,
    brandId:generalFileds._id,
    price:joi.number().min(1).positive(),
    discount:joi.number().min(1).max(100).positive(),
    stock:joi.number().integer().min(1).positive(),
    files:joi.object({
    mainImage:joi.array().items(generalFileds.file.required()),
    subImages:joi.array().items(generalFileds.file)
    }),
    description:joi.string().min(5).max(1000),
    size:joi.array().items(joi.string().required()),
    colors:joi.array().items(joi.string().required())
}).required() 
