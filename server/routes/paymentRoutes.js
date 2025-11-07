import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Initialize Razorpay instance with keys from .env file
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Route to create a new Razorpay order
router.post("/create-order", async (req, res) => {
  try {
    let { amount } = req.body; 

    if (!amount) {
      return res.status(400).json({ success: false, message: "Amount is required" });
    }

    // Convert amount from rupees to paise
    amount = amount * 100;

    const options = {
      amount: amount, // Razorpay requires amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    // Create order in Razorpay
    const order = await razorpay.orders.create(options);

    res.json({ success: true, order });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
