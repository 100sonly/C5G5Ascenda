const request = require('supertest');
const backend = require('../app');

describe('Test pricesByDestination', () => {
    test('Should return a list of hotel prices with valid parameters', async () => {
        const response = await request(backend).get('/prices/destination/WD0M/2024-08-01/2024-08-07/en_US/SGD/2');
        //console.log(response.body);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Should return an empty body with invalid parameters', async () => {
        const response = await request(backend).get('/prices/destination/hihi/2024-08-01/2024-08-07/en_US/SGD/2');
        //console.log(response.body);
        expect(response.body.length).toBe(0);      
    });
});

describe('Test priceByRoom', () => {
    test('Should return a list of specific hotel room prices with valid parameters', async () => {
        const response = await request(backend).get('/prices/hotel/diH7/WD0M/2024-08-01/2024-08-07/en_US/SGD/2');
        //console.log(response.body);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Should return an empty body with invalid parameters', async () => {
        const response = await request(backend).get('/prices/hotel/diH8/WD0M/2024-08-01/2024-08-07/en_US/SGD/2');
        //console.log(response.body);
        expect(response.body.length).toBe(0);      
    });
});
