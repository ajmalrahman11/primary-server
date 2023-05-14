const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
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
orderSchema.pre("save", async function (next) {
  if (this.isNew && !this.orderId) {
    const prefix = "DEV-ORDER";
    const sequenceNumber = await this.constructor.countDocuments();
    const paddedSequenceNumber = (sequenceNumber + 1)
      .toString()
      .padStart(5, "0");
    this.orderId = prefix + paddedSequenceNumber;
  }
  next();
});

module.exports = mongoose.model("order", orderSchema);
