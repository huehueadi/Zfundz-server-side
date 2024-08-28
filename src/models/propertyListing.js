import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
    {
        propertyName:{
            type:String,
            required:true
        },

        propertyType:{
            type:String,
            required:true

        },
        propertyAddress:{
            type:String,
            required:true
        },

        marketValue:{
            type:Number,
            required:true
        },
        created_at:{
            type: Date,
            default: Date.now

        },
        updated_at:{
            type: Date,
            default: Date.now

        }
    }
)
const Property = mongoose.model('Property', propertySchema)

export default Property