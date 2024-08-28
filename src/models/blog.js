import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'active',
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now

    },
    updated_at:{
        type:Date,
        default:Date.now
    }
   
});
const Blog = mongoose.model('Blog', blogSchema )

export default Blog;