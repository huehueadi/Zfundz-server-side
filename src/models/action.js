import mongoose from "mongoose";

 const actionSchema = new mongoose.Schema({
    actionName :{
        type:String,
        required:true,
        unique:true
    }
 })

 const Action = mongoose.model('Action', actionSchema)

 export default Action 


 