const request = require('supertest');
const backend = require('../app');
const data = require ('./test_data')

jest.setTimeout(30000); // Sets timeout to 30 seconds

describe('Test findByDestination', () => {
    test('Should return a list of hotels with a valid destination_id', async () => {
        //const response = await request(backend).get('/hotels/destination/WD0M');
        const response = await request(backend).get(`/hotels/destination/${data.valid_dest}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Should return an empty body with an invalid destination_id', async () => {
        //const response = await request(backend).get('/hotels/destination/hihi');
        const response = await request(backend).get(`/hotels/destination/${data.invalid_dest}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    });
});

describe('Test findById', () => {
    test('Should return a hotel details with valid hotel_id', async () => {
        //const response = await request(backend).get('/hotels/hotel/diH7');
        const response = await request(backend).get(`/hotels/hotel/${data.valid_hotel}`);
        //console.log(response.body);
		
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();

        // Check if response.body contains the expected properties
        expect(response.body).toHaveProperty('id', `${data.valid_hotel}`);
     });

    test('Should return an empty body with an invalid hotel_id', async () => {
        //const response = await request(backend).get('/hotels/hotel/diHx');
        const response = await request(backend).get(`/hotels/hotel/${data.invalid_hotel}`);
        //console.log(response.body);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(undefined);
    });
});


