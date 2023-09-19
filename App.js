const express = require('express');
const app = express();
const morgan = require('morgan');

const productRoutes = require('./api/routes/Products');
const orderRoutes = require('./api/routes/Orders');

app.use(morgan('dev'));

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = app;