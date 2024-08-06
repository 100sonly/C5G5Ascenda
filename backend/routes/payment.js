const express = require('express');
const router = express.Router();
const paymentController = require("../controllers/payment.js")

router.post("/api/create-checkout-session", async (req, res) => { 
    paymentController.createCheckoutSession(req, res);
}); 

router.post("/webhook", express.raw({type: 'application/json'}), (req, res) => {
    paymentController.webHookHandler(req, res);
});

router.get('/', async function(req, res, next) {
    paymentController.defaultResponse(req, res);
});


module.exports = router;