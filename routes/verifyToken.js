var express = require("express");
var router = express.Router();

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  // const authHeader = req.headers["token"];
  // const token = authHeader && authHeader.split(" ")[1]; // get token from Authorization header
  const token = req.headers["token"];

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

module.exports = verifyToken;
