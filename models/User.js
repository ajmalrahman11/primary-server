const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    userType: {
      type: Number,
      default: false,
      required: true,
      default: 0,
    },
    userId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

// Define a pre-save middleware function to generate order ID
userSchema.pre("save", async function (next) {
  if (this.isNew && !this.userId) {
    const prefix = "DEV";
    const sequenceNumber = await this.constructor.countDocuments();
    const paddedSequenceNumber = (sequenceNumber + 1)
      .toString()
      .padStart(5, "0");
    this.userId = prefix + paddedSequenceNumber;
  }
  next();
});

// userTypes
// 0 = customer,
// 1 = vendor,
// 2 = delivery boy,
// 3 = franchise admin,
// 4 = super admin

module.exports = mongoose.model("users", userSchema);
