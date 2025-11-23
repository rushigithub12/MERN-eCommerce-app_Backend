const express = require("express");
const {
  createdOrder,
  fetchOrderByUser,
  updateOrder,
  deleteOrder,
} = require("../controller/Order");
const router = express.Router();

router
  .post("/", createdOrder)
  .get("/", fetchOrderByUser)
  .patch("/:id", updateOrder)
  .delete("/:id", deleteOrder);

exports.router = router;
