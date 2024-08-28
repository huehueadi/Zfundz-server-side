import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({

    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    total_invesmtent:{
        type: Number,
        default: 0,
        required: true
    },
    number_of_tickets:{
        type:Number,
        default:0,
        required: true

    },
    tickets:[{
        ticket_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Ticket',
        },
        property_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Property'
        },
        property_name: { 
            type: String 
        },
        property_location: { 
            type: String 
        },

        number_of_tickets: { 
            type: Number 
    },
        investment: { 
            type: Number 
    }
    }]


})

const Portfolio = mongoose.model('Portfolio', portfolioSchema)

export default Portfolio;