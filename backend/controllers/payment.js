const paymentModel = require("../models/payment.js");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createCheckoutSession(req, res) {
    const { product } = req.body; 
    console.log(product.price);
    const session = await stripe.checkout.sessions.create({ 
        payment_method_types: ["card"], 
        line_items: [{ 
            price_data: { 
                currency: "usd", 
                product_data: { 
                name: product.name, 
                }, 
                unit_amount: Math.ceil(product.price * 100), 
            }, 
            quantity: 1, 
        }, 
        ], 
        mode: "payment", 
        success_url: "http://localhost:3001/success", 
        cancel_url: "http://localhost:3001/", 
    }); 
    res.json({ id: session.id }); 
}

async function defaultResponse(req, res) {
    res.send("respond with payment information")
}

module.exports = { defaultResponse, createCheckoutSession }