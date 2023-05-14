// const mongoose = require("mongoose");
// var express = require("express");
// var router = express.Router();
// const dotenv = require("dotenv");
// const jwt = require("jsonwebtoken");
// const { verifyToken } = require("./verifyToken");

// dotenv.config();
// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// const Order =
//   mongoose.models.Order ||
//   mongoose.model("Order", new mongoose.Schema({}, { strict: false }), "orders");

// router.get("/", verifyToken, async (req, res, next) => {
//   try {
//     const bookings = await Order.find({}).sort({ createdAt: -1 });
//     return res.status(200).json({
//       booking: bookings,
//       message: "Bookings lists fetched successfully",
//     });
//   } catch (err) {
//     console.error("error on finding the data", err);
//     res.status(500).json({ error: "Unable to fetch bookings" });
//   }
// });

// // getting single booking details
// router.get("/details", verifyToken, async (req, res, next) => {
//   try {
//     const bookingDetails = await Order.find({ _id: req.headers.query });
//     return res.status(200).json({
//       booking: bookingDetails,
//       message: "Booking details fetched successfully",
//     });
//   } catch (err) {
//     console.error("error on finding the data", err);
//     res.status(500).json({ error: "Unable to fetch booking" });
//   }
// });

// // changing the booking status
// // router.post("/change-status", verifyToken, async (req, res, next) => {
// //   let orderStatus = req.body.status;
// // try {
// //     const order = await Order.findOneAndUpdate(
// //       { _id: req.headers.query },
// //       { status: orderStatus },
// //       { new: true }
// //     );

// //     if (!order) {
// //       return res.status(404).json({ message: "Order not found" });
// //     }

// //     return res.status(200).json({ message: "Order status updated successfully" });
// //   } catch (error) {
// //     return res.status(500).json({ message: error.message });
// //   }
// // });

// router.post("/change-status", verifyToken, async (req, res, next) => {
//   const bookingStatus = req.body.status;
//   const bookingId = req.headers.query;

//   console.log("bookingStatus", bookingStatus);

//   try {
//     // Find the booking by ID
//     const booking = await Order.findById(bookingId);
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     // Check if the status can be updated
//     if (booking.status === 2 || booking.status === 3) {
//       return res
//         .status(400)
//         .json({ message: "Booking status cannot be updated" });
//     }
//     if (bookingStatus === 0 || bookingStatus < booking.status) {
//       return res.status(400).json({ message: "Invalid status update" });
//     }

//     // Update the booking status
//     const order = await Order.findOneAndUpdate(
//       { _id: req.headers.query },
//       { status: bookingStatus },
//       { new: true }
//     );

//     console.log("new booking status", booking.status);
//     return res
//       .status(200)
//       .json({ message: "Booking status updated successfully", booking });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
