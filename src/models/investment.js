import mongoose, { Schema } from "mongoose";

const investmentSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    franchise_id: { type: Schema.Types.ObjectId, ref: 'Franchise', required: true },
    investment_amount: { type: Number, required: true },
    invested_date: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'approved', 'declined'], default: 'pending' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const investment = mongoose.model("investment", investmentSchema)

export default investment