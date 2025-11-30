const express = require("express");
const {
  createdOrder,
  fetchOrderByUser,
  updateOrder,
  deleteOrder,
  fetchAllOrders,
} = require("../controller/Order");
const router = express.Router();

router
  .post("/", createdOrder)
  .get("/", fetchAllOrders)
  .get("/own/", fetchOrderByUser)
  .patch("/:id", updateOrder)
  .delete("/:id", deleteOrder);

exports.router = router;
