import mongoose, {Schema , Types, model, mongo } from 'mongoose'

const categorySchema= new Schema({
name:{
    type:String,
    unique:[true,"name must be unique"],
    required:[true,'name is required'],
    trim:true,
    lowercase:true
},
slug:{
    type:String,
    unique:[true,"slug must be unique"],
    required:[true,'slug is required'],
    trim:true,
    lowercase:true

},
image:{
    type:Object,
    required:[true,'image is required']
},
createdBy:{
    type:Types.ObjectId,
    ref:'User',
    required:[true,'userId is required'],
},
updatedBy:{
    type:Types.ObjectId,
    ref:'User',
    required:[true,'userId is required'],
},
isDeleted:{
    type:Boolean,
    default:false
}

},
{timestamps:true,
toJSON:{virtuals:true},  // to show the data
toObject:{virtuals:true} //to operate the data
}
)


categorySchema.virtual('subCategory', {
    ref: 'SubCategory',   //the other schema
    localField: '_id',   // in this schema
    foreignField: 'categoryId', //in the other schema
  });

const categoryModel=mongoose.model.category||model('Category',categorySchema)
export default categoryModel