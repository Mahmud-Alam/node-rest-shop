const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/Products');
const orderRoutes = require('./api/routes/Orders');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CORS Error Handling
app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin','https://mahmudalam.com');      //if I want to restrict only for couples of domains
    res.header('Access-Control-Allow-Origin','*');                              //If I allow for all domains, then use '*'
    //res.header('Access-Control-Allow-Headers','*');                              //If I allow for all types of headers
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    
    // Block the incoming request: if we are not returning immediately OPTIONS request's response, use next() method
    next();
});

// Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Page Not Found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;