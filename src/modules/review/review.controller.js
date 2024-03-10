import orderModel from "../../../DB/models/order.model.js";
import productModel from "../../../DB/models/product.model.js";
import reviewModel from "../../../DB/models/review.model.js";
import { AppError, asyncHandler } from "../../utils/asyncHandler.js";


// **************************** addReview **********************************
export const addReview = asyncHandler(async (req, res, next) => {
    const { comment, rate, orderId } = req.body
    const { productId } = req.params

    //check product
    const product = await productModel.findOne({ _id: productId })
    if (!product) {
        return next(new AppError("product not found", 404))
    }

    //check order
    const order = await orderModel.findOne({
        _id: orderId,
        userId: req.user._id,
        status: "delivered",
        "products.productId": productId
    })
    if (!order) {
        return next(new AppError("order not found", 404))
    }

    //check review
    const reviewExist = await reviewModel.findOne({
        userId: req.user._id,
        productId,
        orderId
    })
    if (reviewExist) {
        return next(new AppError("already review it before", 400))
    }

    const review = await reviewModel.create({ comment, rate, orderId, productId, userId: req.user._id })

    
    let sum = product.avgRate * product.rateNum
    sum = sum + rate

    product.avgRate = sum / (product.rateNum + 1)
    product.rateNum += 1
    await product.save()
    
    review ? res.status(201).json({ msg: "done", review }) : next(new AppError("fail", 500))

})



// **************************** removeReview **********************************

export const removeReview = asyncHandler(async (req, res, next) => {
    const { productId, id } = req.params

    //check product
    const product = await productModel.findOne({ _id: productId })
    if (!product) {
        return next(new AppError("product not found", 404))
    }
    //check review
    const reviewExist = await reviewModel.findOneAndDelete({
        userId: req.user._id,
        _id: id
    })
    if (!reviewExist) {
        return next(new AppError("already review it before", 400))
    }


    let sum = product.avgRate * product.rateNum
    sum = sum - reviewExist.rate

    product.avgRate = sum / (product.rateNum - 1)
    product.rateNum -= 1
    await product.save()
    res.status(200).json({ msg: "done" })
})