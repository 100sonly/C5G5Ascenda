const emailModel = require("../models/email.js");
const express = require('express');
var router = express.Router();


router.get("/send", emailModel.send);

module.exports = router;
