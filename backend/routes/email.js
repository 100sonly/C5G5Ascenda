const emailController = require("../controllers/email.js");
const express = require('express');
var router = express.Router();

router.post("/send", async (req, res) => {
    emailController.sendEmail(req, res);
}); 

router.get('/', async function(req, res, next) {
    emailController.defaultResponse(req, res);
});

module.exports = router;
