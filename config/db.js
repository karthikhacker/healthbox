const mongoose = require('mongoose');
require('dotenv').config();

const createConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
        console.log('MONGODB CONNECTED');
    } catch (error) {
        console.log(error);

    }
}

module.exports = createConnection;