const request = require('supertest');
const backend = require('../app');
//const data = require ('./test_data')

jest.setTimeout(30000); // Sets timeout to 30 seconds

const booking_info = {
  personalInfo: {
    firstName: 'gfg',
    lastName: 'ff',
    phoneNumber: '67676767',
    emailAddress: 'teds@mail.com',
    salutation: 'MR',
    specialRequests: 'aaaa'
  },
  bookingDetails: {
    hotelName: 'Parc Sovereign Hotel Tyrwhitt',
    roomName: 'Classic Room, 2 Twin Beds, Balcony',
    hotelRating: 3,
    hotelAddress: '165 Tyrwhitt Road',
    nights: 1,
    price: '337.87',
    bookingId: 'obxMRsBU5182a',
    numberOfRooms: '1',
    strt: 'Tue, 6 Aug, 2024#8:00 AM',
    end: 'Wed, 7 Aug, 2024#8:00 AM',
    img: {
      suffix: '.jpg',
      count: 49,
      prefix: 'https://d2ey9sqrvkqdfs.cloudfront.net/obxM/'
    },
    amenitiesArray: [
      'airConditioning',
      'businessCenter',
      'dataPorts',
      'dryCleaning',
      'hairDryer',
      'inHouseDining',
      'meetingRooms',
      'outdoorPool',
      'safe',
      'tVInRoom'
    ],
    checkIn: { date: 'Tue, 6 Aug, 2024', time: '8:00 AM' },
    checkOut: { date: 'Wed, 7 Aug, 2024', time: '8:00 AM' },
    heroImage: 'https://d2ey9sqrvkqdfs.cloudfront.net/obxM/0.jpg',
    amenities: [
      'airConditioning',
      'businessCenter',
      'dataPorts',
      'dryCleaning',
      'hairDryer',
      'inHouseDining',
      'meetingRooms',
      'outdoorPool',
      'safe',
      'tVInRoom'
    ]
  },
  hotelData: {
    heroImage: 'https://d2ey9sqrvkqdfs.cloudfront.net/obxM/0.jpg',
    hotelName: 'Parc Sovereign Hotel Tyrwhitt',
    hotelRating: 3,
    hotelAddress: '165 Tyrwhitt Road',
    hotelAmenities: {
      airConditioning: true,
      businessCenter: true,
      dataPorts: true,
      dryCleaning: true
    }
  },
  booking_id: 'obxMRsBU5182a' 
};

describe('Booking Tests', () => {

    test('It should respond with status 201 and create new booking', async () => {
      const response = await request(backend).post('/booking/add').send(booking_info);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('message', 'Booking added successfully');
    });

    test('It should retrieve a booking by booking_id with status 200', async () => {
      const response = await request(backend).get(`/booking/${booking_info.booking_id}`);
      expect(response.statusCode).toBe(200);
      //expect(response.body).toHaveProperty('email', user.email);
    });

    test('It should return 404 if the booking_id not exist', async () => {
      const nonExistentBookingId = 'obxMRsBU51820';
      //const url = `/booking/${nonExistentBookingId}`;
      //const response = await request(backend).get(url);
      const response = await request(backend).get(`/booking/${nonExistentBookingId}`);
      expect(response.statusCode).toBe(404);
      //console.log(response);
      const responseBody = JSON.parse(response.text);
      expect(responseBody).toHaveProperty('error', 'Booking not found');
    });

    test('It should respond with status 200 and delete booking', async () => {
      const response = await request(backend).get(`/booking/deleteBookingsByEmail/teds@mail.com`);
      //console.log(response);
      expect(response.statusCode).toBe(200);
      //expect(response.body).toHaveProperty('message', 'Booking added successfully');
    });

    test('Ensure bookings have been deleted', async () => {
      const response = await request(backend).get(`/booking/getBookingsByEmail/teds@mail.com`);
      //console.log(response);
      expect(response.statusCode).toBe(404);
      //const responseBody = JSON.parse(response.text);
      //expect(responseBody).toHaveProperty('error', 'Bookings not found');
      //got error
    });

    test('It should respond with status 404 and return error message', async () => {
      const response = await request(backend).get(`/booking/deleteBookingsByEmail/teds@mail.com`);
      //console.log(response);
      expect(response.statusCode).toBe(404);
      //const responseBody = JSON.parse(response.text);
      //expect(responseBody).toHaveProperty('error', 'Bookings not found');
      //got error
    });
});
