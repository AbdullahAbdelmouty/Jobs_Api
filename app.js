require('dotenv').config();
require('express-async-errors');
const express = require("express");
const connectDB = require('./DB/connect');
// Import Routers 
const jobRouters = require('./Routers/jobs');
const authRourers = require('./Routers/auth');
// Import Middlwares
const errorHandlerMiddlware = require('./Middlwares/ErrorHandlwer');
const NotFoundMiddlware = require('./Middlwares/NotFound');
const authenticated = require('./Middlwares/authentication');
// Import security packages
const helmet = require('helmet');
const cors = require('cors');
const ratelimit = require('express-rate-limit');

const app = express();

//middlewares
app.use(ratelimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));
app.use(cors());
app.use(helmet());
app.use("trust proxy",1);
app.use(express.json());
//routes
app.use('/api/v1/jobs',authenticated,jobRouters);
app.use('/api/v1/auth',authRourers);
//Middlwares
app.use(NotFoundMiddlware)
app.use(errorHandlerMiddlware);
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