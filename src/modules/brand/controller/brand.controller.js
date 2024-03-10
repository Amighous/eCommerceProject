import slugify from "slugify"
import brandModel from "../../../DB/models/brand.model.js"
import cloudinary from "../../../utils/cloudinary.js";





///////// CREATE THE brand /////////


export const createBrand= async(req,res,next)=>{
//1
const {name}=req.body
//1
if(await brandModel.findOne({name})){
    return next(new Error("name already exist",{cause:409}))
}
//2
if(!req?.file){
    return next(new Error("image required"))
  }
//3
const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:"eCommerce/Brand"})
if(!public_id){
    return next(new Error("image not added"))

}
//5
const slug = slugify(name)
//6
const newBrand=await brandModel.create({
    name,
    slug,
    image:{secure_url,public_id}
})

return res.status(201).json({message:"done",brand:newBrand})
 
}










///////// GET ALL BRANDS /////////

export const allBrands=async(req,res,next)=>{
    const brands=await brandModel.find()
    return res.status(200).json({message:"done",brands})
}







///////// GET  onebrand /////////

export const onebrand=async(req,res,next)=>{
    const brand=await brandModel.findById({_id:req.params.brandId})
    if(!brand){
        return next(new Error("brand not found",{cause:404}))
    }
    return res.status(200).json({message:"done",brand})

}













///////// UPDATE brand /////////



export const updateBrand=async(req,res,next)=>{
    const brandId=req.params.brandId
    //1
    const brand=await brandModel.findById({_id:brandId})
    if(!brand){
        return next(new Error("brand not found",{cause:404}))

    }
    //2
    if(req.body.name){
        //3
        if(await brandModel.findOne({name:req.body.name})){
            return next(new Error("name already exist",{cause:409}))
        }
        req.body.slug=slugify(req.body.name)
    }

    //4
    if(req.file){
        //5
        const {public_id,secure_url}= await cloudinary.uploader.upload(req.file.path,{folder:"/eCommerce/Brand"})
        if(!public_id){
        return next(new Error("image required"))
        }
       
        req.body.image={public_id,secure_url}
        //6
        await cloudinary.uploader.destroy(brand.image.public_id)
    }
    //7
    const updatedBrand= await brandModel.findOneAndUpdate({_id:brandId},req.body,{new:true})
    return res.status(201).json({message:"done",updatedBrand})

}



export const deleteBrand = async(req,res,next)=>{
    const deletedBrand = await brandModel.findOneAndDelete({ _id: req.params.brandId });

    if (!deletedBrand) {
        return res.status(404).json({ message: "Brand not found" });
    }

    return res.status(200).json({ message: "Brand deleted", deletedBrand });
}
