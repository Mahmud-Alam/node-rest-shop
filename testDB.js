const express = require("express");
const mongoose = require("mongoose");
const app = express();

//DB
const databae = (module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useMongoClient: true,
  }
  try {
    mongoose.connect(
        "mongodb+srv://mahmud:mahmud@node-rest-shop.fqo5xee.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp", 
        // {useMongoClient: true,}          //this piece of code gives error
        );
    console.log('Database Connect Successfully!');
  } catch (err) {
    console.log(err);
    console.log('Database Connect Failed!');
  }
});

databae();

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
