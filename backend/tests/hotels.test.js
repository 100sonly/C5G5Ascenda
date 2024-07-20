const request = require('supertest');
const backend = require('../app');

//describe('/destination/:destination_id', () => {
describe('Test hotelDestination', () => {
        test('Should return a list of hotels with a valid destination_id', async () => {
        const response = await request(backend).get('/hotels/destination/WD0M');
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Should return an empty body with an invalid destination_id', async () => {
        const response = await request(backend).get('/hotels/destination/hihi');
        expect(response.body.length).toBe(0);
    });
});
