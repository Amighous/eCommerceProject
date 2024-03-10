import mongoose, {Schema , Types, model, mongo } from 'mongoose'

const orderSchema= new Schema({
products:[{
    
    productId :{
        type:Types.ObjectId,
        ref:'Product',
    },
    name:{
        type:String,
        required:[true,'name is required'],
       
    
    },
    quantity:{
        type : Number,
        required:true,
        min:1
    },
    unitPrice:{
        type:Number,
        required:true,
        min:1
    },
    finalPrice:{
        type:Number,
        required:true,
        min:1
    },
}],
note:String,
reason:String,
address:{
    type:String,
    required:true
},
phoneNumber:[{
    type:String,
    required:true
}],
paymentType:{
    type:String,
    enum:['card','visa'],
    default:'cash'
},
status:{
    type:String,
    enum:['placed','waitForPayment','canceld','onWay','rejected','deliverd'],
    default:'placed'
},
couponId:{
    type:Types.ObjectId,
    ref:'Coupon'
},
subPrice:{
    type:Number,
    required:true,
    min:1
},
totalPrice:{
    type:Number,
    required:true,
    min:1
},
userId:{
    type:Types.ObjectId,
    ref:'User',
    required:true
},
updatedBy:{
    type:Types.ObjectId,
    ref:'User',
}

},
{
    timestamps:true,
}
)



const orderModel=mongoose.model.Order||model('Order',orderSchema)
export default orderModel