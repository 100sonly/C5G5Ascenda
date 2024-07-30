const express = require('express');
const router = express.Router();
const paymentController = require("../controllers/payment.js")

router.get('/', async function(req, res, next) {
    paymentController.defaultResponse(req, res);
});

module.exports = router;