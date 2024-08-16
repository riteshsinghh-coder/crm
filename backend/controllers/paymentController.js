const Razorpay = require('razorpay');
const Subscription = require('../models/Subscription');
const Client = require('../models/Client');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createOrder = async (req, res) => {
    try {
        const { amount, clientId } = req.body;

        const subscription = await razorpay.orders.create({
            amount: amount * 100, // Amount in paise
            currency: 'INR',
            receipt: `receipt_${clientId}_${Date.now()}`
        });

        res.status(200).json({ orderId: subscription.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { paymentId, orderId, signature } = req.body;

        const crypto = require('crypto');
        const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                                        .update(orderId + "|" + paymentId)
                                        .digest('hex');

        if (generatedSignature === signature) {
            const client = await Client.findOne({ subscription: orderId });
            if (client) {
                client.subscriptionStatus = 'active';
                await client.save();
                res.status(200).json({ message: 'Payment verified successfully' });
            } else {
                res.status(400).json({ message: 'Invalid subscription' });
            }
        } else {
            res.status(400).json({ message: 'Invalid signature' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
