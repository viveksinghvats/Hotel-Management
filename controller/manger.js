const HotelManagement = require('../models/HotelManagement');
const { vallidateBooking } = require('./managerHelper');
function bookRoom(req, res) {
    const bookError = vallidateBooking(req.body);
    if (bookError.error) {
        return res.status(400).send({ message: bookError.error.details[0].message });
    }
    let hotel = HotelManagement.getInstance();

    const response = hotel.bookRoom(req.body);
    return res.status(201).send(response);
}

function viewRoom(req, res) {
    const { email } = req.params
    let hotel = HotelManagement.getInstance();
    const response = hotel.viewRoom(email);
    return res.status(200).send(response);
}

function getAllGuests(req, res) {
    let hotel = HotelManagement.getInstance();
    let response = hotel.getAllGuests();
    return res.status(200).send(response);
}

function cancelRoom(req, res) {
    let hotel = HotelManagement.getInstance();
    const { email } = req.params;
    let response = hotel.cancelRoom(email);
    return res.status(200).send(response);
}

function modifyRoom(req, res) {
    let hotel = HotelManagement.getInstance();
    let response = hotel.editExtension(req.body);
    return res.status(200).send(response);
}

module.exports = {
    bookRoom,
    viewRoom,
    getAllGuests,
    cancelRoom,
    modifyRoom
}