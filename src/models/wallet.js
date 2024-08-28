
import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    default: 0
  },
  transactions: [{
    amount: Number,
    type: String, 
    date: {
      type: Date,
      default: Date.now
    },
    description: String
  }]
});

const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet
