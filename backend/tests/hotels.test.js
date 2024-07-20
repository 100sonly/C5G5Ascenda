const request = require('supertest');
const backend = require('../app');

describe('Test findByDestination', () => {
    test('Should return a list of hotels with a valid destination_id', async () => {
        const response = await request(backend).get('/hotels/destination/WD0M');
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Should return an empty body with an invalid destination_id', async () => {
        const response = await request(backend).get('/hotels/destination/hihi');
        expect(response.body.length).toBe(0);
    });
});

describe('Test findById', () => {
    test('Should return a hotel details with valid hotel_id', async () => {
        const response = await request(backend).get('/hotels/hotel/diH7');
        //console.log(response.body);
    });

    test('Should return an empty body with an invalid hotel_id', async () => {
        const response = await request(backend).get('/hotels/hotel/hihi');
        expect(response.body.length).toBe(undefined);
    });
});


