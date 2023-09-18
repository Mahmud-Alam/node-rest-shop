const express = require('express');
const productRoutes = require('./api/routes/Products');

const app = express();

app.use('/products', productRoutes);

module.exports = app;