const express = require("express");
const { createProduct, fetchAllproducts } = require("../controller/Product");
const router = express.Router();

router.post("/", createProduct).get("/", fetchAllproducts);

exports.router = router;
