const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Middleware function to verify JWT token
const verifyToken = async (req, res, next) => {
  // const authHeader = req.headers["token"];
  // const token = authHeader && authHeader.split(" ")[1]; // get token from Authorization header
  const token = await req.headers["token"];

  if (!token) {
    return res
      .status(401)
      .send({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY); // verify token with your secret key
    req.user = decoded; // add decoded user object to the request object
    next(); // pass control to the next handler
  } catch (err) {
    return res.status(401).send({ message: "Access denied. Invalid token." });
  }
};

module.exports = { verifyToken };
