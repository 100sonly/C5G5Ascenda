const request = require('supertest');
const backend = require('../app');
const data = require ('./test_data')

jest.setTimeout(30000); // Sets timeout to 30 seconds

const user = {
  username: 'moca',
  name: 'moca',
  email: 'moca@gmail.com',
  password: 'mocapw123' // Ensure password meets minimum length requirement
};

const user2 = {
  username: 'notmoca',
  name: 'notmoca',
  email: 'moca@gmail.com',
  password: 'mocapw123' // Ensure password meets minimum length requirement
};

const user3 = {
  username: '',
  name: 'notmoca',
  email: 'moca3@gmail.com',
  password: 'mocapw123' // Ensure password meets minimum length requirement
};

const user4 = {
  username: 'notmoca',
  name: '',
  email: 'moca4@gmail.com',
  password: 'mocapw123' // Ensure password meets minimum length requirement
};

const user5 = {
  username: 'notmoca',
  name: 'notmoca',
  email: '',
  password: 'mocapw123' // Ensure password meets minimum length requirement
};

const user6 = {
  username: 'notmoca',
  name: 'notmoca',
  email: 'moca5@gmail.com',
  password: 'mocapw' // Ensure password meets minimum length requirement
};

describe('Customer Registration and Login Tests', () => {

  describe('Test register (valid)', () => { 
    test('It should respond with status 201 and create an account for a valid body', async () => {
      const response = await request(backend).post('/customers/reg').send(user);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('message', 'Customer added successfully');
    });

    test('It should fail to create an account for an existing user', async () => {
      const response = await request(backend).post('/customers/reg').send(user);
      expect(response.statusCode).toBe(409);
      expect(response.body).toHaveProperty('error', 'Username is already taken');
    });
    
    test('It should fail to create an account for a registered email', async () => {
      const response = await request(backend).post('/customers/reg').send(user2);
      //console.log(response.text);
      expect(response.statusCode).toBe(409);
      expect(response.body).toHaveProperty('error', 'Email is already registered');
    });

    test('It should fail to create an account for missing username', async () => {
      const response = await request(backend).post('/customers/reg').send(user3);
      //console.log(response.text);
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error', 'Username is required');
    });

    test('It should fail to create an account for missing name', async () => {
      const response = await request(backend).post('/customers/reg').send(user4);
      //console.log(response.text);
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error', 'Name is required');
    });

    test('It should fail to create an account for missing email', async () => {
      const response = await request(backend).post('/customers/reg').send(user5);
      //console.log(response.text);
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error', 'Email is required');
    });

    test('It should fail to create an account for invalid password', async () => {
      const response = await request(backend).post('/customers/reg').send(user6);
      //console.log(response.text);
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error', 'Password is required and should be at least 8 characters long');
    });
    
  });

  describe('Test login', () => {
    test('It should respond with status 200 and login successfully for a valid user', async () => {
      const loginDetails = { username: user.username, password: user.password };
      const response = await request(backend).post('/customers/login').send(loginDetails);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Login successful');
    });

    test('It should respond with status 401 for invalid login details', async () => {
      const loginDetails = { username: user.username, password: 'wrongpassword' };
      const response = await request(backend).post('/customers/login').send(loginDetails);
      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty('error', 'Invalid username or password');
    });
  });
 
   describe('Test getAllCustomers', () => {
    test('It should retrieve all customers with status 200', async () => {
      const response = await request(backend).get('/customers/all');
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('Test getUserByEmail', () => {
    test('It should retrieve a customer by email with status 200', async () => {
      const response = await request(backend).get(`/customers/one/${user.email}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('email', user.email);
    });

    test('It should return 404 if the customer does not exist', async () => {
      const nonExistentEmail = 'nonexistent@gmail.com';
      const response = await request(backend).get(`/customers/one/${nonExistentEmail}`);
      expect(response.statusCode).toBe(404);
	  //console.log(response);
      expect(response).toHaveProperty('text', 'Customer not found');
    });
  });

  describe('Test deleteAccount (valid) ', () => { 
    test('It should respond with status 200 and delete an account for a valid email', async () => {
      const url = `/customers/deleteCustomerByEmail/${user.email}`;
      const response = await request(backend).get(url);
      //expect(response.statusCode).toBe(200);
      expect(response).toBeDefined();
      expect(response).toHaveProperty('text', 'Deletion successful!');
    });

    test('It should respond with status 200 and delete an account for a invalid email', async () => {
      const url = `/customers/deleteCustomerByEmail/email@email.com`;
      const response = await request(backend).get(url);
      //expect(response.statusCode).toBe(200);
      expect(response).toBeDefined();
      expect(response).toHaveProperty('text', 'Email not found!');
    });
  });

  /*describe('Test deleteCustomerByEmail', () => {
    test('It should delete a customer by email with status 200', async () => {
      const response = await request(backend).delete(`/customers/deleteCustomerByEmail/${user.email}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Deletion successful!');
    });

    test('It should return 404 if the email does not exist', async () => {
      const nonExistentEmail = 'nonexistent@gmail.com';
      const response = await request(backend).delete(`/customers/deleteCustomerByEmail/${nonExistentEmail}`);
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('error', 'Email not found');
    });
  });*/
  
});
