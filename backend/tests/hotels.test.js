const request = require('supertest');
const backend = require('../app');
const data = require ('./test_data')

describe('Test findByDestination', () => {
    test('Should return a list of hotels with a valid destination_id', async () => {
        const url = `/hotels/destination/${data.valid_dest}`;
        const response = await request(backend).get(url);
        //const response = await request(backend).get('/hotels/destination/WD0M');
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Should return an empty body with an invalid destination_id', async () => {
        const url = `/hotels/destination/${data.invalid_dest}`;
        const response = await request(backend).get(url);
        //const response = await request(backend).get('/hotels/destination/hihi');
        expect(response.body.length).toBe(0);
    });
});

describe('Test findById', () => {
    test('Should return a hotel details with valid hotel_id', async () => {
        const url = `/hotels/hotel/${data.valid_hotel}`;
        const response = await request(backend).get(url);
        //const response = await request(backend).get('/hotels/hotel/diH7');
        //console.log(response.body);
        expect(response.body).toBeDefined();
        expect(typeof response.body).toBe('object');
        expect(response.body).toHaveProperty('id', `${data.valid_hotel}`);
    });

    test('Should return an empty body with an invalid hotel_id', async () => {
        const url = `/hotels/hotel/${data.invalid_hotel}`;
        const response = await request(backend).get(url);
        //const response = await request(backend).get('/hotels/hotel/hihi');
        expect(response.body.length).toBe(undefined);
    });
});


