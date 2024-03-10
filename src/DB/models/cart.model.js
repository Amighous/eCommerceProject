import mongoose, {Schema , Types, model, mongo } from 'mongoose'

const cartSchema= new Schema({
products:[{
    productId :{
        type:Types.ObjectId,
        ref:'Product',
    },
    quantity:{
        type : Number,
        required:true,
        min:1
    }
}],

userId:{
    type:Types.ObjectId,
    ref:'User',
    unique:true,
    required:true
}

},
{
    timestamps:true,
}
)



const cartModel=mongoose.model.Cart||model('Cart',cartSchema)
export default cartModel