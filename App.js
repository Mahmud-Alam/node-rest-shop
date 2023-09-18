const express = require('express');
const productRoutes = require('./api/routes/Products');
const orderRoutes = require('./api/routes/Orders');

const app = express();

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = app;