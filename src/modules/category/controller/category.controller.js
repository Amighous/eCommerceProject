import slugify from "slugify"
import categoryModel from "../../../DB/models/category.model.js"
import cloudinary from "../../../utils/cloudinary.js";





///////// CREATE THE CATEGORY /////////

{
//1-get the data. then check if the name existed 
//2-check if there is any problem in upload the image 
//3-upload the image in the cloudiinary and destruct secure_url , public_id
//4-check if the image has been uploaded
//5-slug the name
//6-create the category
}

export const createCategory= async(req,res,next)=>{
//1
const {name}=req.body
//1
if(await categoryModel.findOne({name})){
    return next(new Error("name already exist",{cause:409}))
    // return res.status(409).json({message:})
}
//2
if(!req?.file){
    return next(new Error("image required"))
  }
//3
const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:"eCommerce/category"})
if(!public_id){
    return next(new Error("image not added"))

}
//6

req.body.createdBy=req.user._id
req.body.slug=slugify(name)
req.body.updatedBy=req.user._id
req.body.image= {secure_url,public_id}
const newCategory=await categoryModel.create(req.body)

return res.status(201).json({message:"done",category:newCategory})
 
}










///////// GET ALL CATEGORIES /////////

export const allCategories=async(req,res,next)=>{
    const categories=await categoryModel.find().populate([{
        path:"subCategory"
    }])
    // in this case we used populate to show that categories have subcategories
    return res.status(200).json({message:"done",categories})
}







///////// GET  oneCategory /////////

export const oneCategory=async(req,res,next)=>{
    const category=await categoryModel.findById({_id:req.params.categoryId})
    if(!category){
        return next(new Error("category not found",{cause:404}))
    }
    return res.status(200).json({message:"done",category})

}













///////// UPDATE CATEGORY /////////

 

export const updateCategory=async(req,res,next)=>{
    const categoryId=req.params.categoryId
    //1
    const category=await categoryModel.findById({_id:categoryId})
    if(!category){
        return next(new Error("category not found",{cause:404}))

    }
    //2
    if(req.body.name){
        //3
        if(await categoryModel.findOne({name:req.body.name})){
            return next(new Error("name already exist",{cause:409}))
        }
        req.body.slug=slugify(req.body.name)
    }

    //4
    if(req.file){
        //5
        const {public_id,secure_url}= await cloudinary.uploader.upload(req.file.path,{folder:"/eCommerce/category"})
        if(!public_id){
        return next(new Error("image required"))
        }
       
        req.body.image={public_id,secure_url}
        //6
        await cloudinary.uploader.destroy(category.image.public_id)
    }
    //7
    req.body.updatedBy=req.user._id

    const updatedCategory= await categoryModel.findOneAndUpdate({_id:categoryId},req.body,{new:true})
    return res.status(201).json({message:"done",updatedCategory})

}




export const deleteCategory = async(req,res,next)=>{

    const deletedCategory= await categoryModel.findOneAndDelete({ _id:req.params.categoryId });

        if (!deletedCategory) {
            return res.status(404).json({ message: "category not found" });
        }

        return res.status(200).json({ message: "category deleted", deletedCategory });
    }