import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    property_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Properties'
    },
    ticket_price:{
        type:Number,
        default:5000,
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    quantity:{
        type:Number,
        default:1,
        required:true
    },
    purchase_date:{
        type:Date,
        default: Date.now
    }
    
})
const Ticket = mongoose.model('Ticket', ticketSchema)

export default Ticket