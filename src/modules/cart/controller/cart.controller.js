import cartModel from "../../../DB/models/cart.model.js"
import productModel from "../../../DB/models/proudact.model.js"

export const addCart= async (req,res,next )=>{
  const {productId,quantity}=req.body

  const cart = await cartModel.findOne({userId:req.user._id})

  const product = await productModel.findOne({_id:productId,stock: { $gte: quantity } })

  if(!product){
    return next (new Error ('invalid product',{cause:400}))
  }
  if(!cart){
    const cartCreated = await cartModel.create({userId:req.user._id,products:[{productId,quantity}]})
    return res.status(201).json({message : 'done',cartCreated})

  }

  let match= false

    for (const product of cart.products) {
      if(product.productId==productId){
        product.quantity=quantity
        match=true
        break;  
      }
    }
  
    if(!match){
      cart.products.push({productId,quantity})
    }  
  await cart.save()
  return res.status(200).json({message : 'done',cart})
}



export const removeFromCart= async (req,res,next )=>{
  const {productId}=req.params
  
  const product = await productModel.findOne({_id:productId})
  if(!product){
    return next (new Error ('invalid product',{cause:400}))
  }

  const cart = await cartModel.findOne({userId:req.user._id})
  if(!cart){
    const cartCreated = await cartModel.create({userId:req.user._id,products:[{productId,quantity}]})
    return res.status(201).json({message : 'done',cartCreated})

  }
  const updateCart= await cartModel.updateOne({userId:req.user._id},{
    $pull:{
      products:{
        productId : productId
      }
    }
  })
  return res.status(200).json({message : 'done',updateCart})
}

export const removeAllProducts= async (req,res,next )=>{
  const {productId}=req.params
  
  
  const cart = await cartModel.findOne({userId:req.user._id})
  if(!cart){
    const cartCreated = await cartModel.create({userId:req.user._id,products:[{productId,quantity}]})
    return res.status(201).json({message : 'done',cartCreated})

  }

  const updateCart= await cartModel.updateOne({userId:req.user._id},{
     products: []
    
  },{new:true})
  return res.status(200).json({message : 'done',updateCart})
}
export const getAllCart= async (req,res,next )=>{
  
  
  const cart = await cartModel.findOne({userId:req.user._id})
  if(!cart){
    const cartCreated = await cartModel.create({userId:req.user._id,products:[{productId,quantity}]})
    return res.status(201).json({message : 'done',cartCreated})

  }

  return res.status(200).json({message : 'done',cart})
}