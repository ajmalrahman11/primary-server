var express = require("express");
var router = express.Router();
const Booking = require("../models/Booking");

// booking a ride
router.post("/", async (req, res, next) => {
  const newBooking = Booking({
    email: req.body.email,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    whatsappNumber: req.body.whatsappNumber,
    streetAddress: req.body.streetAddress,
    streetAddress2: req.body.streetAddress2,
    cityAddress: req.body.cityAddress,
  });

  try {
    console.log("booking", newBooking);
    const booking = await newBooking.save();
    res
      .status(201)
      .json({ booking: booking, message: "Booking successfully completed" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
