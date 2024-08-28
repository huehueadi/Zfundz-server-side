import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true },
    mobile: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    kyc_status: { 
        type: String, 
        required: true, 
        default: "Pending" 
    },

    address:{
        type:String,
        required: true
    },
    
    country:{
        type:String,
        required:true
    },

    about:{
        type:String,

    },

    role: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Role', 
    }],
   
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    updated_at: { 
        type: Date, 
        default: Date.now 
    }
});


const User = mongoose.model('User', userSchema);

export default User;
