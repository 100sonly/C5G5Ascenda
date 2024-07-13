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

async function pricesByDestination(destination_id, checkin, checkout, lang, currency, guests, partner_id) {
    const response = await fetch(`https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${destination_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&guests=${guests}&partner_id=${partner_id}`);
    const text = await response.text();
    const text_json = await JSON.parse(text);
    const rooms = text_json['hotels'];
    //console.log(Object.keys(text_json));
    var price_list = [];
    for (let i=0; i < rooms.length; i++) {
        current = rooms[i];
        prices_to_add = new Price(current.id, current.searchRank, current.price, current.market_rates);
        price_list.push(prices_to_add);
    }
    return price_list;
}

module.exports = { Price, pricesByDestination }