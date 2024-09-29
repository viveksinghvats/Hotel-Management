class Room {
    constructor(roomNo){
        this.roomNo = roomNo;
    }

    getGuestDetails(){
        const result =  this.guest;
        if(result){
            return {...result.details(), roomNo: this.roomNo, stay: this.getDaysDifference()}
        }
        return null; 
    }

    roomAvailable(){
        return !this.guest;
    }
    
    bookRoom(guest, checkinTime, checkoutTime){
         this.guest = guest;
         this.checkinTime = checkinTime;
         this.checkoutTime = checkoutTime;
    }

    extendBoooking(checkinTime, checkoutTime){
        this.checkinTime = checkinTime ?? this.checkinTime;
        this.checkoutTime = checkoutTime ?? this.checkoutTime;
    }

    cancleBooking(){
        this.guest = null;
        this.checkinTime = null;
        this.checkoutTime = null;
    }


     getDaysDifference() {
        const checkinDate = new Date(this.checkinTime);
        const checkoutDate = new Date(this.checkoutTime);
        const differenceInMillis = checkoutDate - checkinDate;
        const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);
    
        return differenceInDays;
    }

}

module.exports = Room;