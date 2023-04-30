const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const dbName = "myproject";

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected successfully to server");
  })
  .catch((err) => console.error(err));

const collection = mongoose.connection.collection("mycollection");

module.exports = { mongoose, collection };
