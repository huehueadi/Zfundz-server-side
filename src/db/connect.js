import mongoose from "mongoose";

const connection = async()=>{
    try {
        mongoose.connect("mongodb://localhost:27017/database2")
        console.log("Database Connected Sucessfully")
    } catch (error) {
        console.log("Database is not cnnected", error)
        
    }
}
export default connection

    
