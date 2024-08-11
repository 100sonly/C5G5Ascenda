const hotelModel = require('../models/hotels.js');

async function getHotelsByDestination(req, res) {
    try{
        const destination_id = req.params.destination_id;
        //console.log(destination_id);
        const all = await hotelModel.findByDestination(destination_id);
        res.set('Access-Control-Allow-Origin', 'http://localhost:3001');
        res.send(all);
    } catch (err) {
        console.error('Error in getHotelsByDestination:', err);
        res.status(500).json({error: 'An error occurred in getHotelsByDestination'});
    }
}

async function getHotelInfo(req, res) {
    try {
        const hotel_id = req.params.hotel_id;
        //console.log(hotel_id);
        const all = await hotelModel.findById(hotel_id);
        res.set('Access-Control-Allow-Origin', 'http://localhost:3001');
        res.send(all);
    } catch (err) {
        console.log("Error in getHotelInfo: ", err);
        res.status(500).json({error: "An error occurred in getHotelInfo"})

    }
}

async function defaultResponse(req, res) {
    res.send('respond with a resource');
}

module.exports = { getHotelsByDestination, getHotelInfo, defaultResponse };