import slugify from "slugify"
import categoryModel from "../../../DB/models/category.model.js"
import productModel from "../../../DB/models/proudact.model.js"
import subCategoryModel from "../../../DB/models/subCategory.model.js"
import { nanoid } from "nanoid"
import brandModel from "../../../DB/models/brand.model.js"
import cloudinary from "../../../utils/cloudinary.js"
import ApiFeatures from "../../../utils/apiFeatures.js"

export const createProduct = async (req,res,next) => {
    const {categoryId,subCategoryId,brandId}=req.body

    if(!await categoryModel.findOne({_id:categoryId,isDeleted:false})){
        return next(new Error('category not founded',{cause:404}))
    }

    if(!await subCategoryModel.findOne({_id:subCategoryId,isDeleted:false,categoryId})){
        return next(new Error('subCategory not founded',{cause:404}))
    }

    if(!await brandModel.findOne({_id:brandId,isDeleted:false})){
        return next(new Error('brand not founded',{cause:404}))
    }

    req.body.slug=slugify(req.body.name,{
        trim:true,
        lower:true
    })


    req.body.totalPrice =  req.body.price -  ((req.body.price* req.body.discount || 0)/100)
    req.body.customId= nanoid()

 const {secure_url,public_id}=await cloudinary.uploader.upload(req.files.mainImage[0].path,
        {folder:`eCommerce/category/${categoryId}/subCategory/${subCategoryId}/products/${req.body.customId}/mainImage`})

    if(!public_id){
        return next(new Error("image is required"))
    }
req.body.mainImage= {secure_url,public_id}

let images= []


if(req.files?.subImages?.length){

    for (const image of req.files.subImages) {
        const {secure_url,public_id}=await cloudinary.uploader.upload(image.path,
            {folder:`eCommerce/category/${categoryId}/subCategory/${subCategoryId}/products/${req.body.customId}/subImages`})
        if(!public_id){
            return next(new Error("images is required"))
    
        }
        images.push({secure_url,public_id})
    }
    req.body.subImages=images
}


req.body.createdBy=req.user._id
  const product = await productModel.create(req.body)
return res.status(200).json({message:"done",product})
}
////////////////
 
export const getAllProducts= async (req,res,next)=>{
  
    const apiFeatures= new ApiFeatures(
        productModel.find(),
        req.query)
        .paginate()
        .filter()
        .sort()
        .fields()
        .search()


        const products=await apiFeatures.mongooseQuery

    return res.status(200).json({message:"done",products})
}


////////////
export const getOneProduct= async (req,res,next)=>{

    const product= await productModel.findById({_id:req.params.productId})
    return res.status(200).json({message:"done",product})
}


export const updateProduct = async (req,res,next) => {
    const {productId}=req.params 
    const {categoryId,subCategoryId,brandId}=req.body

    const product= await productModel.findById({_id:productId})

    if(!product){
        return next(new Error('invalid product id',{cause:404}))
    }
    if(categoryId && !await categoryModel.findOne({_id:categoryId,isDeleted:false})){
        return next(new Error('category not founded',{cause:404}))
    }

    if(subCategoryId&&!await subCategoryModel.findOne({_id:subCategoryId,isDeleted:false,categoryId})){
        return next(new Error('subCategory not founded',{cause:404}))
    }

    if(subCategoryId&&!await brandModel.findOne({_id:brandId,isDeleted:false})){
        return next(new Error('brand not founded',{cause:404}))
    }

    if(req.body.name){
        req.body.slug=slugify(req.body.name,{
            trim:true,
            lower:true
        })
    }
    
    req.body.totalPrice = ( req.body.price || product.price) -  (((req.body.price || product.price) * (req.body.discount || product.discount || 0))/100)

if(req.files?.mainImage?.length){
 const {secure_url,public_id}=await cloudinary.uploader.upload(req.files.mainImage[0].path,
        {folder:`eCommerce/category/${categoryId || product.categoryId}/subCategory/${subCategoryId || product.subCategoryId}/products/${product.customId}/mainImage`})

    if(!public_id){
        return next(new Error("image is required"))
    }
req.body.mainImage= {secure_url,public_id}
await cloudinary.uploader.destroy(product.mainImage.public_id)
}

if(req.files?.subImages?.length){

    for (const image of req.files.subImages) {
        const {secure_url,public_id}=await cloudinary.uploader.upload(image.path,
            {folder:`eCommerce/category/${categoryId}/subCategory/${subCategoryId}/products/${req.body.customId}/subImages`})
        if(!public_id){
            return next(new Error("images is required"))
    
        }
        if(!product.subImages){
            product.subImages=[]
        }
        product.subImages.push({secure_url,public_id})
    }
    req.body.subImages=product.subImages
}

// req.body.updatedBy=req.user._id
const updateProduct = await productModel.findByIdAndUpdate({_id:productId},req.body,{new : true})
return res.status(200).json({message:"done",updateProduct})
}

///////////////////////

export const deleteProduct = async(req,res,next)=>{

    const deletedProduct = await productModel.findOneAndDelete({ _id: req.params.productId });

        if (!deletedProduct) {
            return res.status(404).json({ message: "product not found" });
        }

        return res.status(200).json({ message: "product deleted", deletedProduct });
}