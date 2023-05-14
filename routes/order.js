const express = require("express");
const Order = require("../models/Order");
const dotenv = require("dotenv");
const { verifyToken } = require("./verifyToken");

dotenv.config();
const router = express.Router();

// adding order
router.post("/add", verifyToken, async (req, res, next) => {
    const addOrder = Order({
      name: req.body.name,
      variants: req.body.variants,
      addOns: req.body.addOns,
      image: {
        data: req.body.imageData,
        contentType: req.body.imageType,
      },
      imageSource: req.body.imageSource,
      OrderId: req.body.OrderId,
      locationAdminId: req.body.locationAdminId,
    });
  
    try {
      let Order = await addOrder.save();
      res
        .status(200)
        .json({ Order: Order, message: "Order Successfully Added" });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
