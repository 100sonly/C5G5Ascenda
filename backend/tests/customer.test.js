const request = require('supertest');
const backend = require('../app');

jest.setTimeout(30000); // Sets timeout to 30 seconds

const username = 'moca';
const name = 'moca';
const email = 'moca@gmail.com';
const password_hash = 'mocapw';

// Create account
describe('Test createAccount ', () => { 
    test('It should respond with status 201 and create an account for a valid body', async () => {
        const url = `/customers/addCustomer/${username}/${name}/${email}/${password_hash}`;
        const response = await request(backend).get(url);
        expect(response.statusCode).toBe(200);

        expect(response).toBeDefined();
        // Check if response.body contains the expected properties
        expect(response).toHaveProperty('text', 'Insertion successful!');
     });

     test('It should respond fail to create an account for a exisiting user', async () => {
        const url = `/customers/addCustomer/${username}/${name}/${email}/${password_hash}`;
        const response = await request(backend).get(url);
        expect(response.statusCode).toBe(200);
        expect(response).toBeDefined();
        // Check if response.body contains the expected properties
        expect(response).toHaveProperty('text', 'Insertion failed!');
     });
});