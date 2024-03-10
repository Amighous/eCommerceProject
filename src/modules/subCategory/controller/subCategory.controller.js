import slugify from "slugify"
import categoryModel from "../../../DB/models/category.model.js"
import cloudinary from "../../../utils/cloudinary.js";
import subCategoryModel from "../../../DB/models/subCategory.model.js";





///////// CREATE THE CATEGORY /////////

{

    //*category exist?**
//1-get the data. then check if the name existed 
//2-check if there is any problem in upload the image 
//3-upload the image in the cloudiinary and destruct secure_url , public_id
//4-check if the image has been uploaded
//5-slug the name
//6-create the category
}

export const createSubCategory= async(req,res,next)=>{
    const {categoryId}=req.params
    if( !await categoryModel.findById({_id:categoryId})){
        return next(new Error("category not found",{cause:404}))
    }
    const {name}=req.body
    //1
    if(await subCategoryModel.findOne({name})){
        return next(new Error("name already exist",{cause:409}))
        // return res.status(409).json({message:})
    }

    //2
    if(!req?.file){
        return next(new Error("image required"))
    }
    //3
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`eCommerce/category/subcategory/${categoryId}`})


    if(!public_id){
        return next(new Error("image not added"))
    }

    //5
    const slug = slugify(name)
    req.body.categoryId=categoryId

    //6
    const newCategory=await subCategoryModel.create({
        name,
        slug,
        image:{secure_url,public_id},categoryId
    })

    return res.status(201).json({message:"done",subCategory:newCategory})
 
}










///////// GET allSubCategories /////////

export const allSubCategories=async(req,res,next)=>{
    const {categoryId}=req.params

    const categories=await subCategoryModel.find({categoryId}).populate([{
        path:"categoryId"
    }])
    
    return res.status(200).json({message:"done",categories})
}







///////// GET  oneSubCategory /////////

export const oneSubCategory=async(req,res,next)=>{
    const oneSub=await subCategoryModel.findById({_id:req.params.subCategoryId}).populate([{
        path:"categoryId"
    }])
    // in this case we used populate to show that subcategory belongs to category  
    if(!oneSub){
        return next(new Error("subcategory not found",{cause:404}))
        
    }
    return res.status(200).json({message:"done",oneSub})

} 













///////// UPDATE CATEGORY /////////

 
export const updateSubCategory=async(req,res,next)=>{
    const {categoryId}=req.params

    const subCategoryId=req.params.subCategoryId
    //1
    const subCategory=await subCategoryModel.findById({_id:subCategoryId})
    if(!subCategory){
        return next(new Error("subCategory not found",{cause:404}))

    }
    //2
    if(req.body.name){
        //3
        if(await subCategoryModel.findOne({name:req.body.name})){
            return next(new Error("name already exist",{cause:409}))
        }
        req.body.slug=slugify(req.body.name)
    }

    //4
    if(req.file){
        //5
        const {public_id,secure_url}= await cloudinary.uploader.upload(req.file.path,{folder:`eCommerce/category/${categoryId}/subCategory`})
        if(!public_id){
        return next(new Error("image required"))
        }
       
        req.body.image={public_id,secure_url}
        //6
        await cloudinary.uploader.destroy(subCategory.image.public_id)
    }
    //7
    const updatedSubCategory= await subCategoryModel.findOneAndUpdate({_id:subCategoryId},req.body,{new:true})
    return res.status(201).json({message:"done",updatedSubCategory})

}


export const deleteSubCategory = async(req,res,next)=>{

    const deletedSubCategory= await subCategoryModel.findOneAndDelete({ _id: req.params.subCategoryId });

    if (!deletedSubCategory) {
        return res.status(404).json({ message: "subCategory not found" });
    }

    return res.status(200).json({ message: "subCategory deleted", deletedSubCategory});
}