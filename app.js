const express = require('express');
const createConnection = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

createConnection();


//routes 
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const patientRoutes = require('./lab-service/routes/patient');
const labRoutes = require('./lab-service/routes/lab');

app.use('/v1/api', userRoutes);
app.use('/v1/api', profileRoutes);
app.use('/v1/api', patientRoutes);
app.use('/v1/api', labRoutes);
app.use(errorHandler);

module.exports = app;