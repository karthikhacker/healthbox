const app = require('./app');
require('dotenv').config();

const port = process.env.PORT || 8000;
//createConnection();
app.listen(port, () => {
    if (process.env.NODE_ENV === 'development') {
        console.log('App running in development mode at port  ', port);
    } else if (process.env.NODE_ENV === 'production') {
        console.log('App running in production mode at port  ', port);
    }
})
