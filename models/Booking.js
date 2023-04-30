const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    whatsappNumber: {
      type: Number,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    streetAddress2: {
      type: String,
      required: true,
    },
    cityAddress: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    orderId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

// Define a pre-save middleware function to generate order ID
bookingSchema.pre("save", async function (next) {
  if (this.isNew && !this.orderId) {
    const prefix = "AMA";
    const sequenceNumber = await this.constructor.countDocuments();
    const paddedSequenceNumber = (sequenceNumber + 1)
      .toString()
      .padStart(5, "0");
    this.orderId = prefix + paddedSequenceNumber;
  }
  next();
});

module.exports = mongoose.model("order", bookingSchema);
