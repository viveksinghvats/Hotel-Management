const express = require('express');
const manager = require('./route/manager');
const HotelManagement = require('./models/HotelManagement');

const app = express();
const port = 9000;

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));

app.use('/', manager);

HotelManagement.getInstance();
app.listen(port, () => {
    console.log(`server running at port: ${port}`);
})

