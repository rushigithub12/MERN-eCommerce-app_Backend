const express = require("express");
const {
  createProduct,
  fetchAllproducts,
  fetchProductById,
  updateProduct,
} = require("../controller/Product");
const router = express.Router();

router
  .post("/", createProduct)
  .get("/", fetchAllproducts)
  .get("/:id", fetchProductById)
  .patch("/:id", updateProduct);

exports.router = router;
