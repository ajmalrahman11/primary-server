const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    variants: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        offerPrice: {
          type: Number,
        },
        quantity: {
          type: Number,
        },
      },
    ],
    addOns: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        offerPrice: {
          type: Number,
        },
        quantity: {
          type: Number,
        },
      },
    ],
    image: {
      data: Buffer,
      contentType: String,
    },
    imageSource: {
      type: String,
    },
    productId: {
      type: String,
      unique: true,
    },
    locationAdminId: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Define a pre-save middleware function to generate order ID
productSchema.pre("save", async function (next) {
  if (this.isNew && !this.productId) {
    const prefix = "DEV-PDT";
    const sequenceNumber = await this.constructor.countDocuments();
    const paddedSequenceNumber = (sequenceNumber + 1)
      .toString()
      .padStart(5, "0");
    this.productId = prefix + paddedSequenceNumber;
  }
  next();
});

// userTypes
// 0 = customer,
// 1 = vendor,
// 2 = delivery boy,
// 3 = franchise admin,
// 4 = super admin

module.exports = mongoose.model("products", productSchema);
