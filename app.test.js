const request = require('supertest');
const express = require('express');
const  manager  = require('./route/manager');
const HotelManagement = require('./models/HotelManagement');

jest.mock('./models/HotelManagement');

const app = express();
app.use(express.json());
app.use('/', manager);


describe('POST /book (bookRoom API)', () => {

  beforeEach(() => {
    // Reset mocks before each test
    HotelManagement.getInstance.mockClear();
    HotelManagement.getInstance.mockReturnValue({
      bookRoom: jest.fn().mockReturnValue(1) 
    });
  });

  it('should book a room and return success message with stay duration', async () => {
    const payload = {
      "email": "vives16@gmail.com",
      "name": "Vivek",
      "address": "Mau",
      "checkinTime": "2024-09-30",
      "checkoutTime": "2024-10-03"
    };

    const expectedResponse = {
      "name": "Vivek",
      "email": "vives16@gmail.com",
      "address": "Mau",
      "roomNo": 1,
      "stay": 3
    };

    const response = await request(app)
      .post('/book')
      .send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expectedResponse);
  });

  it('should return 400 when required fields are missing', async () => {
    const payload = {
      "email": "vives16@gmail.com",
      "checkinTime": "2024-09-30",
      "checkoutTime": "2024-10-03"
    };

    const response = await request(app)
      .post('/book')
      .send(payload);

    expect(response.status).toBe(400);
    expect(response.body.message).toContain("\"name\" is required");
  });

  it('should return 400 when checkoutTime is earlier than checkinTime', async () => {
    const payload = {
      "email": "vives16@gmail.com",
      "name": "Vivek",
      "address": "Mau",
      "checkinTime": "2024-10-03",
      "checkoutTime": "2024-09-30"
    };

    const response = await request(app)
      .post('/book')
      .send(payload);

    expect(response.status).toBe(400);
    expect(response.body.message).toContain("\"checkoutTime\" must be greater than \"ref:checkinTime\"");
  });
});
