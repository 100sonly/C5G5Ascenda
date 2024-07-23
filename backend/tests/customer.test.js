const request = require('supertest');
const backend = require('../app');

jest.setTimeout(30000); // Sets timeout to 30 seconds

const username = 'moca';
const name = 'moca';
const email = 'moca@gmail.com';
const password_hash = 'mocapw';

// Create account
describe('Test createAccount (valid) ', () => { 
   test('It should respond with status 200 and create an account for a valid body', async () => {
      const url = `/customers/addCustomer/${username}/${name}/${email}/${password_hash}`;
      const response = await request(backend).get(url);
      expect(response.statusCode).toBe(200);
      expect(response).toBeDefined();
      expect(response).toHaveProperty('text', 'Creation successful!');
     });

   test('It should respond fail to create an account for a exisiting user', async () => {
      const url = `/customers/addCustomer/${username}/${name}/${email}/${password_hash}`;
      const response = await request(backend).get(url);
      //expect(response.statusCode).toBe(409);
	  //console.log(response);
      expect(response).toBeDefined();
       // Check if response.body contains the expected properties
      expect(response).toHaveProperty('text', 'Email already Registered');
     });
     
});

describe('Test all', () => { 
   test('It should respond with status 200 and display all user accounts', async () => {
       const url = `/customers/all`;
       const response = await request(backend).get(url);
       expect(response.statusCode).toBe(200);
	   //console.log(response.body);
       //expect(response).toBeDefined();
	   expect(response.body.length).toBeGreaterThan(0)
    });
});


describe('Test get email', () => { 
   test('It should respond with status 200 and display user accounts', async () => {
       const url = `/customers/one/${email}`;
       const response = await request(backend).get(url);
       expect(response.statusCode).toBe(200);
	   //console.log(response.body);
       expect(response).toBeDefined();
       // Check if response.body contains the expected properties
       expect(response.body).toHaveProperty('email', `${email}`);
    });

   test('It should respond with status 404 for invalid user accounts', async () => {
       const url = `/customers/one/invalid@email.com`;
       const response = await request(backend).get(url);
       //expect(response.statusCode).toBe(404);
	   //console.log(response.body);
       expect(response).toBeDefined();
       // Check if response.body contains the expected properties
       expect(response).toHaveProperty('text', 'Customer not found');
    });
});


describe('Test deleteAccount (valid) ', () => { 
   test('It should respond with status 200 and delete an account for a valid email', async () => {
      const url = `/customers/deleteCustomerEmail/${email}`;
      const response = await request(backend).get(url);
      //expect(response.statusCode).toBe(200);
      expect(response).toBeDefined();
      expect(response).toHaveProperty('text', 'Deletion successful!');
    });

   test('It should respond with status 200 and delete an account for a valid email', async () => {
      const url = `/customers/deleteCustomerEmail/email@email.com`;
      const response = await request(backend).get(url);
      //expect(response.statusCode).toBe(200);
      expect(response).toBeDefined();
      expect(response).toHaveProperty('text', 'Email not found!');
    });

   //test('It should respond with status 200 and delete an account for a valid ID', async () => {
   //   const url = `/customers/deleteCustomer/0`;
   //   const response = await request(backend).get(url);
   //   expect(response.statusCode).toBe(200);
   //   expect(response).toBeDefined();
   //   expect(response).toHaveProperty('text', 'Deletion successful!');
   // });

   //test('It should respond fail to delete an account for a exisiting user', async () => {
   //   const url = `/customers/deleteCustomer/3`;
   //   const response = await request(backend).get(url);
   //   expect(response.statusCode).toBe(200);
   //   expect(response).toBeDefined();
   //   expect(response).toHaveProperty('text', 'Deletion failed :(');
   //});

});
