import mongoose, {Schema , Types, model, mongo } from 'mongoose'

const couponSchema= new Schema({
name:{
    type:String,
    unique:[true,"name must be unique"],
    required:[true,'name is required'],
    trim:true,
    lowercase:true
},
image:{
    type:Object,
},
expireIn:{
    type :Date,
    required:true
},
amount:{
    type :Number,
    required:true,
    min:1,
    max:100
},
createdBy:{
    type:Types.ObjectId,
    ref:'User',
    required:[false,'userId is required'],
},
usedBy:[{
    type:Types.ObjectId,
    ref:'User',
}],
isDeleted:{
    type:Boolean,
    default:false
}

},
{
    timestamps:true,
}
)



const couponModel=mongoose.model.Coupon||model('Coupon',couponSchema)
export default couponModel