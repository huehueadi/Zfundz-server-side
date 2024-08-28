import Razorpay from 'razorpay';
import crypto from 'crypto';
import transaction from '../../models/transcation.js';
const razorpay = new Razorpay({
  key_id: 'rzp_test_FU6bFHQ3u3xRuI',
  key_secret: 'B1OZS2JZoP1hmweFVkkoI7hB',
});

export const createRazorpayOrder = async (req, res) => {
  const { amount, currency = 'INR' } = req.body;

  try {
    const options = {
      amount: amount * 100,
      currency,
      receipt: `receipt_order_${Math.random().toString(36).substr(2, 9)}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error });
  }
};

export const verifyRazorpayPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    const shasum = crypto.createHmac('sha256', 'B1OZS2JZoP1hmweFVkkoI7hB');
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    const isAuthnetic = digest === razorpay_signature

    if(isAuthnetic){
       
    const newTransaction = new transaction({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    });
    await newTransaction.save();

    res.status(200).json({ message: 'Payment verified successfully' });
    }

    else  {
      return res.status(400).json({ message: 'Transaction not legit!' });
    }
      
  } catch (error) {
    res.status(500).json({ message: 'Failed to verify payment', error });
  }
};
