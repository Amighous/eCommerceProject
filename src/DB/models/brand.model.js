import mongoose, {Schema , Types, model, mongo } from 'mongoose'

const brandSchema= new Schema({
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
    required:[false,'userId is required'],
},
addedBy:{
    type:Types.ObjectId,
    ref:'User',
},
isDeleted:{
    type:Boolean,
    default:false
}

})


const brandModel=mongoose.model.Brand || model('Brand',brandSchema)
export default brandModel