import slugify from "slugify"
import categoryModel from "../../../DB/models/category.model.js"
import cloudinary from "../../../utils/cloudinary.js";
import couponModel from "../../../DB/models/coupon.model.js";





///////// CREATE THE coupon /////////



export const createCoupon= async(req,res,next)=>{
 const {name}=req.body
 if(await couponModel.findOne({name})){
    return next(new Error("name already exist",{cause:409}))
}
if(req.file){

    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:"eCommerce/coupon"})
    if(!public_id){
        return next(new Error("image not added"))
    
    }
    req.body.image={secure_url,public_id}
}
const newCoupon=await couponModel.create(req.body)

return res.status(201).json({message:"done",coupon:newCoupon})
 
}










// ///////// GET allCoupons /////////

export const allCoupons=async(req,res,next)=>{
    const coupons=await couponModel.find()
    return res.status(200).json({message:"done",coupons})
}







// ///////// GET  coupon /////////

export const oneCoupon=async(req,res,next)=>{
    const coupon=await couponModel.findById({_id:req.params.couponId})
    if(!coupon){
        return next(new Error("coupon not found",{cause:404}))
    }
    return res.status(200).json({message:"done",coupon})

}


// ///////// UPDATE CATEGORY /////////



export const updateCoupon=async(req,res,next)=>{
    const couponId=req.params.couponId
    const coupon=await couponModel.findById({_id:couponId})

    if(!coupon){
        return next(new Error("coupon not found",{cause:404}))
    }


    if(req.body.name){
        if(await couponModel.findOne({name:req.body.name})){
            return next(new Error("name already exist",{cause:409}))
        }
    }
 
    if(req.file){
        const {public_id,secure_url}= await cloudinary.uploader.upload(req.file.path,{folder:"/eCommerce/coupon"})
        if(!public_id){
        return next(new Error("image required"))
        }
        req.body.image={public_id,secure_url}
        if(coupon.image){
            await cloudinary.uploader.destroy(coupon.image.public_id)

        }
    }


    const updatedCoupon = await couponModel.findOneAndUpdate({ _id: couponId }, req.body, { new: true });

    return res.status(201).json({message:"done",updatedCoupon})

}



export const deleteCoupon = async(req,res,next)=>{
   
    
    const deletedCoupon = await couponModel.findOneAndDelete({ _id:req.params.couponId });

    if (!deletedCoupon) {
        return res.status(404).json({ message: "coupon not found" });
    }

    return res.status(200).json({ message: "coupon deleted", deletedCoupon });
}