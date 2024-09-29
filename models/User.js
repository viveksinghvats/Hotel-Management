class User{
     constructor(email, name, address){
       this.email = email;
       this.name = name;
       this.address = address;
     }

     details(){
        return {
            name: this.name,
            email: this.email,
            address: this.address
        };
     }

}

module.exports = User;
