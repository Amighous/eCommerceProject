import express from 'express'
import bootstrap from './bootstrap.js'

import { config } from 'dotenv'
import connection from './src/DB/connection.js'
const app = express()
config()
connection()

const port = +process.env.PORT

bootstrap(app,express)



app.listen(port,()=>{
    console.log(`server running in port ..... ${port}`);
})