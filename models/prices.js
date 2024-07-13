class Price {
    constructor(hotel_id, searchRank, price, market_rates) {
        this.hotel_id = hotel_id;
        this.searchRank = searchRank;
        this.price = price;
        this.market_rates = market_rates;
    }
    static newPrice(hotel_id, searchRank, price, market_rates) {
        return new Price(hotel_id, searchRank, price, market_rates);
    }
}

class Room {
    constructor(roomNormalizedDescription, free_cancellation, description, long_description, images, amenities, price, market_rates) {
        this.roomNormalizedDescription = roomNormalizedDescription;
        this.free_cancellation = free_cancellation;
        this.description = description;
        this.long_description = long_description;
        this.images = images;
        this.amenities = amenities;
        this.price = price;
        this.market_rates = market_rates;
    }
    static newRoom(roomNormalizedDescription, free_cancellation, description, long_description, images, amenities, price, market_rates) {
        return new Room(roomNormalizedDescription, free_cancellation, description, long_description, images, amenities, price, market_rates);
    }
}

async function pricesByDestination(destination_id, checkin, checkout, lang, currency, guests, partner_id) {
    const response = await fetch(`https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${destination_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&guests=${guests}&partner_id=${partner_id}`);
    const text = await response.text();
    const text_json = await JSON.parse(text);
    const hotels = text_json['hotels'];
    //console.log(Object.keys(text_json));
    var price_list = [];
    for (let i=0; i < hotels.length; i++) {
        current = hotels[i];
        prices_to_add = new Price(current.id, current.searchRank, current.price, current.market_rates);
        price_list.push(prices_to_add);
    }
    return price_list;
}

async function priceByRoom(hotel_id, destination_id, checkin, checkout, lang, currency, guests, partner_id) {
    const response = await fetch(`https://hotelapi.loyalty.dev/api/hotels/${hotel_id}/price?destination_id=${destination_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&guests=${guests}&partner_id=${partner_id}`);
    const text = await response.text();
    const text_json = await JSON.parse(text);
    const rooms = text_json['rooms'];
    var room_list = [];
    for (let i=0; i < rooms.length; i++) {
        current = rooms[i];
        room_to_add = new Room(current.roomNormalizedDescription, current.free_cancellation, current.description, current.long_description, current.images, current.amenities, current.price, current.market_rates);
        room_list.push(room_to_add);
    }
    return room_list;
}

module.exports = { Price, pricesByDestination, priceByRoom }