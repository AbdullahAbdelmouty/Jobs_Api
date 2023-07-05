require('dotenv').config();
require('express-async-errors');
const express = require("express");
const connectDB = require('./DB/connect');
// routers 
const jobRouters = require('./Routers/jobs');
const authRourers = require('./Routers/auth')
const app = express();
app.use(express.json());
//router
app.use('api/v1/jobs',jobRouters);
app.use('api/v1/auth',authRourers)
const port = process.env.PORT || 3000;
const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`Server listen to port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();