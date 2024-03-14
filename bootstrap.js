import cors from 'cors'
import categoryRouter from './src/modules/category/category.routes.js'
import subCategoryRouter from './src/modules/subCategory/subCategory.routes.js'
import brandRouter from './src/modules/brand/brand.routes.js'
import couponRouter from './src/modules/coupon/coupon.routes.js'
import authRouter from './src/modules/auth/auth.routes.js'
import userRouter from './src/modules/user/user.routes.js'
import productRouter from './src/modules/product/product.routes.js'
import cartRouter from './src/modules/cart/cart.routes.js'
import orderRouter from './src/modules/order/order.routes.js'
import { globalError } from './src/utils/errorHandling.js'


const bootstrap=(app,express)=>{
    var whitelist = ['http://example1.com', 'http://example2.com']
    if(process.env.MOOD == "DEV"){
        app.use(cors())
    }else{ 
        app.use(async (req, res, next) => {
        if(!whitelist.includes(req.header("origin"))){
            return next (new Error("Not allowed by CORS",{cause:502}))
        }
        await res.header('Access-Control-Allow-Origin',"*")
        await res.header('Access-Control-Allow-Header',"*")
        await res.header('Access-Control-Allow-Private-Network',"*")
        await res.header('Access-Control-Allow-Method',"*")
        next()
    })
    }
    // var corsOptions = {
    // origin: function (origin, callback) {
    //     if (whitelist.indexOf(origin) !== -1) {
    //     callback(null, true)
    //     } else {
    //     callback(new Error('Not allowed by CORS'))
    //     }
    // }
    // }

    app.use(express.json())

    app.use('/cart',  cartRouter)
    app.use('/user', userRouter)
    app.use('/auth', authRouter)
    app.use('/brand' , brandRouter) 
    app.use('/coupon', couponRouter )
    app.use('/product', productRouter)
    app.use('/category', categoryRouter)
    app.use( '/subCategory' , subCategoryRouter)
    app.use('/order', orderRouter)
    // app.use(/reviews , reviewsRouter)
    
    app.all('*', (req, res, next) => {
    res.send("In-valid Routing Plz check url or method")
    
    })
    app.use(globalError)
}


export default bootstrap