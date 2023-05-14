var express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const dotenv = require("dotenv");
const { verifyToken } = require("./verifyToken");

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const saltRounds = 10;
var router = express.Router();

router.post("/profile", verifyToken, async (req, res) => {
  // get user object from request object
  const user = await User.findOne({ email: req.user.email });

  res.send({
    message: "User found successfully",
    user: {
      username: user.username,
      name: user.name,
      email: user.email,
      id: user._id,
    },
  });
});

// user registration
router.post("/register", async (req, res, next) => {
  const hashedPass = await bcrypt.hash(req.body.password, saltRounds);
  const newUser = User({
    email: req.body.email,
    username: req.body.username,
    name: req.body.name,
    userType: req.body.userType,
    password: hashedPass,
  });

  //check if the username already exists
  const existEmail = await User.findOne({ email: req.body.email });
  if (existEmail) {
    if (existEmail) {
      res.send("The email already exists");
    }
  } else {
    try {
      const user = await newUser.save();
      res.status(200).json({ user: user, message: "Successfully registered" });
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

// user login
router.get("/login", async (req, res) => {
  const existEmail = await User.findOne({ email: req.body.email });
  console.log("existEmail", existEmail);
  if (!existEmail) {
    return res
      .status(404)
      .json({ message: "No user present with the provided email" });
  } else {
    const validPassword = await bcrypt.compare(
      req.body.password,
      existEmail.password
    );
    if (!validPassword) {
      res.status(404).json({ message: "Invalid password" });
    } else {
      const token = jwt.sign(
        { email: existEmail.email, userType: existEmail.userType },
        JWT_SECRET_KEY,
        {
          expiresIn: "3d", // set the token to expire in 3 days
        }
      );
      return res.status(200).json({ message: "login successful", token });
    }
  }
});

module.exports = router;
