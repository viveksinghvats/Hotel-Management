const Room = require('./Room');
const User = require('./User');

class HotelManagement {
    constructor() {
        if (HotelManagement.instance) {
            return HotelManagement.instance;
        }
        this.rooms = [];
        this.totalRooms = 100;
        this.instance = this;
        this.userRoomCollection = {};
        for (let i = 0; i < this.totalRooms; i++) {
            this.rooms.push(new Room(i + 1));
        }
    }

    static getInstance() {
        if (!HotelManagement.instance) {
            HotelManagement.instance = new HotelManagement();
        }
        return HotelManagement.instance;
    }

    bookRoom(body) {
        const { name, email, address, checkinTime, checkoutTime } = body;
        if (this.checkForRoom(email)) {
            return { message: 'email used to book room no: ' + this.checkForRoom(email).roomNo };
        }
        let user = new User(email, name, address);
        for (let i = 0; i < this.totalRooms; i++) {
            if (this.rooms[i].roomAvailable()) {
                let currentRoom = this.rooms[i];
                currentRoom.bookRoom(user, checkinTime, checkoutTime);
                this.userRoomCollection[email] = currentRoom;
                return currentRoom.getGuestDetails();
            }
        }

        return { message: 'room not available' };
    }

    viewRoom(email) {
        if (this.userRoomCollection[email]) {
            return { status: 'true', message: 'Room no: ' + this.userRoomCollection[email] };
        }
        return { status: 'false', message: 'No room found' };
    }

    checkForRoom(email) {
        return this.userRoomCollection[email];
    }

    getAllGuests() {
        const allGuests = [];
        Object.keys(this.userRoomCollection).forEach(key => {
            allGuests.push(this.userRoomCollection[key].getGuestDetails());
        });
        return allGuests;
    }

    cancelRoom(email) {
        if (this.userRoomCollection[email]) {
            let room = this.userRoomCollection[email];
            room.cancleBooking();
            delete this.userRoomCollection[email];
            return { status: true };
        }
        return { status: false };
    }

    editExtension(body) {
        const { email, roomNo, checkinDate, checkoutDate } = body;
        if (this.userRoomCollection[email]) {
            let room = this.userRoomCollection[email];
            if (room.roomNo == roomNo) {
                room.extendBoooking(checkinDate, checkoutDate);
                return { status: true };
            }
        }
        return { status: false };
    }

}

module.exports = HotelManagement;
