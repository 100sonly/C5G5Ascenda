const connection_str = "hotelapi.loyalty.dev/api/hotels";

class Hotel {
    constructor(id, name, latitude, longitude, address, rating, categories, description, amenities, image_details,trustyou) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.rating = rating;
        this.categories = categories;
        this.description = description;
        this.amenities = amenities;
        this.image_details = image_details;
        this.trustyou=trustyou;
        //trustyou is a json object with user score/rating stuff
    }

    static newHotel(id, name, latitude, longitude, address, rating, categories, description, amenities, image_details,trustyou){
        return new Hotel(id, name, latitude, longitude, address, rating, categories, description, amenities, image_details,trustyou);
    }
}

/** return all hotels in the db
 * @returns a list of hotels
 */
async function findByDestination(destination_id) {
    const response = await fetch(`https://hotelapi.loyalty.dev/api/hotels?destination_id=${destination_id}`);
    //console.log("got it")
    //const response = await fetch(`https://hotelapi.loyalty.dev/api/hotels?destination_id=RsBU`);
    const text = await response.text();
    const text_json = await JSON.parse(text);
    var hotel_list = [];
    for (let i=0; i < text_json.length; i++) {
        current = text_json[i];
        hotel_to_add = new Hotel(current.id, current.name, current.latitude, current.longitude, current.address, current.rating, current.categories, current.description, current.amenities, current.image_details,current.trustyou);
        hotel_list.push(hotel_to_add);
    }
    //console.log("showing it")
    //console.log(hotel_list);
    return hotel_list;
}

async function findById(hotel_id) {
    const response = await fetch(`https://hotelapi.loyalty.dev/api/hotels/${hotel_id}`);
    const text = await response.text();
    const hotel = await JSON.parse(text);
    return new Hotel(hotel.id, hotel.name, hotel.latitude, hotel.longitude, hotel.address, hotel.rating, hotel.categories, hotel.description, hotel.amenities, hotel.image_details,hotel.trustyou);
}

module.exports =  { Hotel, findByDestination, findById }