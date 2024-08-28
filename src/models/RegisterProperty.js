import mongoose from "mongoose";

const registerProperty = new mongoose.Schema({
    property_name:{
        type:String,
        required:true
    },

    property_address:{
        type:String,
        required:true
    },

    property_description:{
        type:String,
        required:true
    },

    property_type:{
        type:String,
        required:true
    },
    space:{
        type:Number,
        required:true
    },
    property_cost:{
        type:Number,
        required:true
    },
    maintainence_cost:{
        type:Number,
        required:true
    },
    total_investment:{
        type:Number,
        required:true 
    },
    annual_returns:{
        type:Number,
        required:true
    },
    maximum_roi:{
        type:Number, 
        required:true
    },
    created_at:{
        type:Date,
        default: Date.now
    },
    updated_at:{
        type:Date,
       default: Date.now
    }
})
const Properties = mongoose.model("Properties", registerProperty)

export default Properties