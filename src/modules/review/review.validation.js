import joi from "joi";
import { generalFiled, headers } from "../../utils/generalField.js";

export const addReview = {
    body: joi
        .object()
        .keys({
            comment: joi.string().min(2).max(5000).required(),
            rate: joi.number().min(1).max(5).required(),
            orderId: generalFiled.id.required(),  
        }).required(),
    params: joi
        .object()
        .keys({
            productId: generalFiled.id.required(),  
        }).required(),

    headers: headers.headers.required(),
};