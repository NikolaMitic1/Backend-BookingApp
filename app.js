require('dotenv').config();
const express = require('express');
const app = express();

//connect to DB
const connectDB = require('./db/connect');

//routes
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const hotelsRoute = require('./routes/hotels');
const roomsRoute = require('./routes/rooms');

//middlewares
app.use(express.json());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/hotels', hotelsRoute);
app.use('/api/v1/rooms', roomsRoute);


const port = 3000;

const start =  async () => {
    try {
        await connectDB(process.env.MONGO);
        app.listen(3000, ()=> {
            console.log(`Server is listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()

