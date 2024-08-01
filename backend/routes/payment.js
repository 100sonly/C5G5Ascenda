const express = require('express');
const router = express.Router();
const paymentController = require("../controllers/payment.js")
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post("/api/create-checkout-session", async (req, res) => { 
  const { product } = req.body; 
  const session = await stripe.checkout.sessions.create({ 
    payment_method_types: ["card"], 
    line_items: [ 
      { 
        price_data: { 
          currency: "usd", 
          product_data: { 
            name: product.name, 
          }, 
          unit_amount: product.price * 100, 
        }, 
        quantity: 1, 
      }, 
    ], 
    mode: "payment", 
    success_url: "http://localhost:3001/success", 
    cancel_url: "http://localhost:3001/cancel", 
  }); 
  res.json({ id: session.id }); 
}); 

router.get('/', async function(req, res, next) {
    paymentController.defaultResponse(req, res);
});

module.exports = router;