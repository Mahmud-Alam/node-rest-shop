const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const ProductModel = require("../models/ProductModel");

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to /products",
  });
});

router.post("/", (req, res, next) => {
  const product = new ProductModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });

  //save() use for store data into databse,
  //then() use for promise, which takes a callback function
  //catch() use error
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:productID", (req, res, next) => {
  const id = req.params.productID;
  ProductModel.findById(id)
  .exec()
  .then(doc => {
    console.log("From Database",doc);
    if(doc){
      res.status(200).json(doc);
    } else{
      res.status(404).json({
        message:"No valid entry found for provided Id!"
      });
    }
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

router.patch("/:productID", (req, res, next) => {
  res.status(200).json({
    message: "Updated product!",
  });
});

router.delete("/:productID", (req, res, next) => {
  res.status(200).json({
    message: "Deleted product!",
  });
});

module.exports = router;
