import mongoose, {Schema , Types, model, mongo } from 'mongoose'

const productSchema= new Schema({
name:{
    type:String,
    required:[true,'name is required'],
    trim:true,
    lowercase:true

},
slug:{
    type:String,
    required:[true,'slug is required'],
    trim:true,
    lowercase:true
},
description:String,
stock:{
    type:Number,
    min:1,
    required:[true,'stock is required']
},
price:{
    type:Number,
    min:1,
    required:[true,'price is required']
},
discount:{
    type:Number
},
totalPrice:{
    type:Number,
    min:1,
    required:[true,'totalPrice is required']
},
colors:[String],
size:[String],
mainImage:{
    type:Object,
    required:[true,'discount is required']
},
subImages:{
    type:Object,
    // required:[true,'subImages is required']
},
createdBy:{
    type:Types.ObjectId,
    ref:'User',
    required:[true,'userId is required'],
},
updatedBy:{
    type:Types.ObjectId,
    ref:'User',
},
categoryId:{
    type:Types.ObjectId,
    ref:'Category',
    required:[true,'categoryId is required'],
},
subCategoryId:{
    type:Types.ObjectId,
    ref:'SubCategory',
    required:[true,'subCategoryId is required'],
},
brandId:{
    type:Types.ObjectId,
    ref:'Brand',
    required:[true,'brandId is required'],
},
isDeleted:{
    type:Boolean,
    default:false
},
customId:{
    type:String,
    required:true
}

},{timestamps:true})


const productModel=mongoose.model.Product||model('Product',productSchema)
export default productModel