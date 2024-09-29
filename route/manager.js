const express = require('express');
const { bookRoom, viewRoom, getAllGuests, cancelRoom, modifyRoom } = require('../controller/manger');
const route = express.Router();

route.post('/book', bookRoom);

route.get('/view/:email', viewRoom);

route.get('/all', getAllGuests);

route.delete('/cancel/:email', cancelRoom);

route.put('/modify', modifyRoom);

module.exports = route;