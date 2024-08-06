const paymentModel = require("../models/payment.js");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = "whsec_35a42b6899b42105af0dabcd97e10ac420fe9df09c6e11a01a988e28c9101211";

async function createCheckoutSession(req, res) {
    const product = req.body; 
    console.log(product.bookingDetails.price);
    const session = await stripe.checkout.sessions.create({ 
        payment_method_types: ["card"], 
        line_items: [{ 
            price_data: { 
                currency: "sgd", 
                product_data: { 
                name: product.bookingDetails.hotelName, 
                }, 
                unit_amount: Math.ceil(product.bookingDetails.price * 100), 
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

async function webHookHandler(req, res) {
    const sig = req.headers['stripe-signature'];

    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'checkout.session.async_payment_failed':
        const checkoutSessionAsyncPaymentFailed = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_failed
        break;
      case 'checkout.session.async_payment_succeeded':
        const checkoutSessionAsyncPaymentSucceeded = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_succeeded
        break;
      case 'checkout.session.completed':
        const checkoutSessionCompleted = event.data.object;
        // Then define and call a function to handle the event checkout.session.completed
        break;
      case 'checkout.session.expired':
        const checkoutSessionExpired = event.data.object;
        // Then define and call a function to handle the event checkout.session.expired
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    res.send();
}

async function defaultResponse(req, res) {
    res.send("respond with payment information")
}

module.exports = { defaultResponse, createCheckoutSession, webHookHandler }