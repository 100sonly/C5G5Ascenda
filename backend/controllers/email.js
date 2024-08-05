const emailModel = require("../models/email.js");

async function sendEmail(req, res) {
    const { personalInfo, bookingDetails, hotelData } = req.body;
    emailModel.send(personalInfo, bookingDetails, hotelData);
}

async function defaultResponse(req, res) {
    res.send('respond with a resource');
}

module.exports = { sendEmail, defaultResponse };