const request = require('supertest');
const backend = require('../app');
const data = require ('./test_data')

describe('Test pricesByDestination', () => {
    test('Should return a list of hotel prices with valid parameters', async () => {
        //const response = await request(backend).get('/prices/destination/WD0M/2024-08-01/2024-08-07/en_US/SGD/2');
        //console.log(response.body);
        const response = await request(backend).get(`/prices/destination/${data.valid_dest}/${data.checkin}/${data.checkout}/${data.lang}/${data.currency}/${data.guests}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    }, 10000);

    test('Should return an empty body with invalid parameters', async () => {
        //const response = await request(backend).get('/prices/destination/hihi/2024-08-01/2024-08-07/en_US/SGD/2');
        //console.log(response.body);
        const response = await request(backend).get(`/prices/destination/${data.invalid_dest}/${data.checkin}/${data.checkout}/${data.lang}/${data.currency}/${data.guests}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);      
    });
});

describe('Test priceByRoom', () => {
    test('Should return a list of specific hotel room prices with valid parameters', async () => {
        //const response = await request(backend).get('/prices/hotel/diH7/WD0M/2024-08-01/2024-08-07/en_US/SGD/2');
        //console.log(response.body);
        const response = await request(backend).get(`/prices/hotel/${data.valid_hotel}/${data.valid_dest}/${data.checkin}/${data.checkout}/${data.lang}/${data.currency}/${data.guests}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    }, 10000);

    test('Should return an empty body with invalid parameters', async () => {
        //const response = await request(backend).get('/prices/hotel/diH8/WD0M/2024-08-01/2024-08-07/en_US/SGD/2');
        //console.log(response.body);
        const response = await request(backend).get(`/prices/hotel/${data.invalid_hotel}/${data.valid_dest}/${data.checkin}/${data.checkout}/${data.lang}/${data.currency}/${data.guests}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);      
    }, 10000);
});
