/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       description: Flexible product/cart item object
 *
 *     SelectedAddress:
 *       type: object
 *       description: Flexible address object
 *
 *     Order:
 *       type: object
 *       required:
 *         - cartItems
 *         - user
 *         - paymentMethod
 *         - selectedAddress
 *       properties:
 *         id:
 *           type: string
 *         cartItems:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *         user:
 *           type: string
 *           description: User ID (ObjectId)
 *           example: "65fd103acb12ef784f9834cd"
 *         totalAmount:
 *           type: number
 *           example: 1200
 *         totalitems:
 *           type: number
 *           example: 3
 *         paymentMethod:
 *           type: string
 *           example: "COD"
 *         selectedAddress:
 *           $ref: '#/components/schemas/SelectedAddress'
 *         status:
 *           type: string
 *           default: "pending"
 *           example: "pending"
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               cartItems:
 *                 - productId: "1"
 *                   title: "iPhone 15"
 *                   quantity: 2
 *               user: "65fd103acb12ef784f9834cd"
 *               totalAmount: 140000
 *               totalitems: 2
 *               paymentMethod: "UPI"
 *               selectedAddress:
 *                 type: "Home"
 *                 city: "Mumbai"
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid request data
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders (Admin purpose)
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /orders/own:
 *   get:
 *     summary: Get orders of the logged-in user
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: User's orders fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized - missing or invalid token
 */

/**
 * @swagger
 * /orders/{id}:
 *   patch:
 *     summary: Update an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               status: "shipped"
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */

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
