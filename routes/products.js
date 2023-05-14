var express = require("express");
const Product = require("../models/Product");
const dotenv = require("dotenv");
const { verifyToken } = require("./verifyToken");

dotenv.config();
var router = express.Router();

// adding products
router.post("/add", verifyToken, async (req, res, next) => {
  const addProduct = Product({
    name: req.body.name,
    variants: req.body.variants,
    addOns: req.body.addOns,
    image: {
      data: req.body.imageData,
      contentType: req.body.imageType,
    },
    imageSource: req.body.imageSource,
    productId: req.body.productId,
    locationAdminId: req.body.locationAdminId,
  });

  try {
    let product = await addProduct.save();
    res
      .status(200)
      .json({ product: product, message: "Product Successfully Added" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/edit", verifyToken, async (req, res, next) => {
  const productId = req.body.productId;
  const editProduct = {
    name: req.body.name,
    variants: req.body.variants,
    addOns: req.body.addOns,
    image: {
      data: req.body.imageData,
      contentType: req.body.imageType,
    },
    imageSource: req.body.imageSource,
    locationAdminId: req.body.locationAdminId,
    isActive: req.body.isActive,
  };
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      productId,
      editProduct,
      {
        new: true, // return the updated document
        runValidators: true, // validate the update data
      }
    );
    res.status(200).json({
      product: updatedProduct,
      message: "Product Successfully Updated",
    });
  } catch {
    res.status(201).json({ message: "Couldn't update the product" });
  }
});

router.post("/delete", verifyToken, async (req, res, next) => {
  const productId = req.body.productId;
  const deleteProduct = {
    isDeleted: true,
  };
  try {
    const deletedProduct = await Product.findOneAndUpdate(
      productId,
      deleteProduct,
      {
        new: true, // return the updated document
        runValidators: true, // validate the update data
      }
    );
    res.status(200).json({
      product: deletedProduct,
      message: "Product Successfully Deleted",
    });
  } catch {
    res.status(201).json({ message: "Couldn't delete the product" });
  }
});

// listing the products
router.get("/", verifyToken, async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      products: products,
      message: "Products list fetched successfully",
    });
  } catch (err) {
    console.error("error on finding the data", err);
    res.status(500).json({ error: "Unable to fetch products" });
  }
});

// listing featured products
router.get("/featured", verifyToken, async (req, res, next) => {
  try {
    const products = await Product.find({ isFeatured: true }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      products: products,
      message: "Featured products list fetched successfully",
    });
  } catch (err) {
    console.error("error on finding the data", err);
    res.status(500).json({ error: "Unable to fetch featured products" });
  }
});

module.exports = router;
