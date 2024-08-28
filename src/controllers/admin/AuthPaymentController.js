import crypto from 'crypto';
import Razorpay from "razorpay";
import Transaction from "../../models/transcation.js";

const razorapy = new Razorpay({
    key_id: 'rzp_test_FU6bFHQ3u3xRuI',
    key_secret: 'B1OZS2JZoP1hmweFVkkoI7hB',
})
export const createTransaction = async(req, res)=>{
    const {amount, currency = 'INR'} = req.body
    try {
        const options = {
            amount:amount*100,
            currency,
            receipt: `receipt_order_${Math.random().toString(36).substr(2, 9)}`,
        };
        const order = await razorapy.orders.create(options)
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json({message:"Failed to create order"})
        
    }
       
};
export const verifyPayment = async (req, res)=>{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac('sha256', 'B1OZS2JZoP1hmweFVkkoI7hB');
  
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest('hex');
  
    if (generatedSignature === razorpay_signature) {
    
      const transaction = new Transaction({
        userId: req.body.userId,
        propertyId: req.body.propertyId,
        ticketId: req.body.ticketId,
        amount: req.body.amount,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      });
  
      try {
        await transaction.save();
        res.json({ success: true, message: 'Payment verified and transaction saved.' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(400).json({ success: false, message: 'Invalid payment signature.' });
    }
  };
 
  // Get transaction details for the authenticated user
 export const getTransactionDetails = async (req, res) => {
  const userId = req.user._id;
    try {
      console.log(userId)
      const transactionsDetails = await Transaction.find({ userId })
        .populate({
          path: 'propertyId',
          select: 'property_name property_address property_description', 
        })
        .populate('ticketId');
    
      res.status(200).json({
        message:"Fetch Successfully",
        success:true,
        transactionsDetails
      })
    } catch (error) {
      res.status(500).json({ message: 'Error fetching transactions', error: error.message });
    }
  };
  
  