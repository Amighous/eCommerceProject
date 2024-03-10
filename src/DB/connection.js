import mongoose from "mongoose";

const connection = async()=>{
    return await mongoose.connect(process.env.URI).then(()=>{
        console.log('connected to db'); 
    }).catch((error)=>{
        console.log('failed to connecting',error);

    })
}
 
export default connection 