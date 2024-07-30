const paymentModel = require("../models/payment.js")

async function defaultResponse(req, res) {
    res.send("respond with payment information")
}

module.exports = { defaultResponse }