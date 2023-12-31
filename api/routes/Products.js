const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const ProductModel = require("../models/ProductModel");

router.get("/", (req, res, next) => {
   //.find() to fetch all data
   //.find().where() to add more conditions to the query
  //.find().limit() to only fetch conditional numbers
  //.exec() to get true promise

  // ProductModel.find().exec().then().catch();
  ProductModel.find()
  .exec()
  .then(docs => {
    console.log('From Database', docs);
    if (docs.length > 0){
      res.status(200).json(docs);
    }else{
      res.status(404).json({
        message:"No entries found!"
      });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
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

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
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

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body){
    updateOps[ops.propName] = ops.value;
  }

  ProductModel.findByIdAndUpdate({_id: id}, { $set: updateOps })              ////.update() not working
  .exec()
  .then(result => {
    console.log(result);
    res.status(200).json(result);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;

  // ProductModel.remove().exec().then().catch();
  ProductModel.findByIdAndDelete(id)                  //.remove() not working
  .exec()
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

module.exports = router;
