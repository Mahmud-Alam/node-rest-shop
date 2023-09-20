const mongoose = require('mongoose');

// Define a product Schema (a layout)
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

//Now we wrapped Schema into Model (object which gives us costructor to build such object based on that schema)
module.exports = mongoose.model('ProductModel', productSchema);