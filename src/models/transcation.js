import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({

    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
    propertyId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Properties",
      required:true
    },
    ticketId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Ticket",
      required:true
    },
    amount:{
      type:Number,
      required:true
    },

    razorpay_order_id: { 
      type: String, 
      required: true
     },

    razorpay_payment_id:{ 
      type: String, 
      required: true 
    },

    razorpay_signature: {
       type: String, 
       equired: true 
    },
    created_at:{
      type:Date,
      default:Date.now
    }
    
  });
  
  const Transaction = mongoose.model('transaction', transactionSchema);
  
export default Transaction
