# Hotel Management System

This is a basic **Node.js** application that manages hotel bookings with CRUD operations.

## Installation Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/viveksinghvats/Hotel-Management.git
2. Navigate to the project directory:
   ```bash
   cd Hotel-Management
3. Install dependencies:
   ```bash
   npm install
4. Start the server
   ```bash
   npm start

## APIS:     
1. POST /book => Book a hotel room.
   ```bash:
   {
   "email": "vives16@gmail.com",
   "name": "Vivek",
   "address": "Mau", 
   "checkinTime": "2024-09-30",
   "checkoutTime": "2024-10-03"
   }
 
 2. Get /view/:email => View user room
 3. Delete /cancel/:email => Cancel a user room
 4. Get /all => Get all guests
 5. Put /modify => update room checking or checkout
    ```bash
    {
    "email": "vives16@gmail.com",
    "roomNo": "1",
    "checkinTime": "2024-09-30",
    "checkoutTime": "2024-10-04"
    }
    
