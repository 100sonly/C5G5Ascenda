const priceModel = require('../models/prices.js');

async function getPricesOfHotels(req, res) {
    const destination_id = req.params.destination_id;
    const checkin = req.params.checkin;
    const checkout = req.params.checkout;
    const lang = req.params.lang;
    const currency = req.params.currency;
    const guests = req.params.guests;

    //console.log(destination_id, checkin, checkout, lang, currency, guests);
    const partner_id = '1';
    //console.log(destination_id);
    const response = await priceModel.pricesByDestination(destination_id, checkin, checkout, lang, currency, guests, partner_id);
    res.set('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.send(response);
}

async function getPricesOfRooms(req, res) {
    const hotel_id = req.params.hotel_id;
    const destination_id = req.params.destination_id;
    const checkin = req.params.checkin;
    const checkout = req.params.checkout;
    const lang = req.params.lang;
    const currency = req.params.currency;
    const guests = req.params.guests;
    const partner_id = 1;

    const response = await priceModel.priceByRoom(hotel_id, destination_id, checkin, checkout, lang, currency, guests, partner_id);
    res.set('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.send(response);
}

async function defaultResponse(req, res) {
    res.send('respond with a resource');
}

module.exports = { getPricesOfHotels, getPricesOfRooms, defaultResponse }