import express from 'express';
import Razorpay from 'razorpay';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
app.use(express.json());

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Razorpay instance
const razorpay = new Razorpay({
  key_id: 'rzp_test_lqs3GxHDuk6FsF',
  key_secret: 'KsgRbtXFMBc5Wl63zkIngAxq'
});

// Serve frontend HTML
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Razorpay Demo</title>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </head>
    <body>
      <h1>Razorpay Payment Demo</h1>
      <button onclick="payNow()">Pay ₹500</button>

      <script>
        async function payNow() {
          const response = await fetch('/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          });
          const orderData = await response.json();

          const options = {
            key: '${razorpay.key_id}',
            amount: orderData.amount,
            currency: orderData.currency,
            name: 'Your Company',
            description: 'Test Transaction',
            order_id: orderData.id,
            handler: function (response) {
              alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
            },
            theme: { color: "#3399cc" }
          };

          const rzp = new Razorpay(options);
          rzp.open();
        }
      </script>
    </body>
    </html>
  `);
});

// Create order route
app.post('/create-order', async (req, res) => {
  const options = {
    amount: 50000, // ₹500 in paise
    currency: 'INR',
    receipt: 'receipt_' + Date.now()
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
