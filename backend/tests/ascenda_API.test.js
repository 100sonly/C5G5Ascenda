describe("Testing Destination Hotel List API Call", () => {
    test("Expected response hotel list", async () =>{
        const res = await fetch("https://hotelapi.loyalty.dev/api/hotels?destination_id=RsBU")
        const data = await res.json();
        //console.log(data.length); // 536
        expect(data.length).toBeGreaterThan(0);
    })
})

describe("Testing Specific Hotel API Call", () => {
    test("Expected response specific hotel + little details", async () =>{
        const res = await fetch("https://hotelapi.loyalty.dev/api/hotels/diH7");
        const data = await res.json();
        //console.log(data.name); // The Fullerton Hotel Singapore
        expect(data.name.length).toBeGreaterThan(0);
    })
})

describe("Testing Destination Hotel Prices API Call", () => {
    test("Expected response list of hotel prices", async () =>{
        const res = await fetch("https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=WD0M&checkin=2024-08-01&checkout=2024-08-07&lang=en_US&currency=SGD&country_code=SG&guests=2&partner_id=1")
        const data = await res.json();
        //console.log(data.hotels.length); // 278
        expect(data.hotels.length).toBeGreaterThan(0);
    })
})


describe("Testing Specific Hotel Price API Call", () => {
    test("Expected response specific hotel and its rooms + details + price", async () =>{
        const res = await fetch("https://hotelapi.loyalty.dev/api/hotels/diH7/price?destination_id=WD0M&checkin=2024-08-01&checkout=2024-08-07&lang=en_US&currency=SGD&country_code=SG&guests=2&partner_id=1");
        const data = await res.json();
        //console.log(data.rooms.length); // 34
        expect(data.rooms.length).toBeGreaterThan(0);
    })
})