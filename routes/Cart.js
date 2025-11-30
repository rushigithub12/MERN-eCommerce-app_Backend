/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: User cart management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - product
 *         - quantity
 *         - user
 *       properties:
 *         id:
 *           type: string
 *           example: "65fd2a9b8a1f4c00234b9e12"
 *         product:
 *           type: string
 *           description: Product ID reference
 *           example: "65fd27948a1f4c00234b9c21"
 *         quantity:
 *           type: number
 *           example: 2
 *         user:
 *           type: string
 *           description: User ID reference
 *           example: "65fd26cd8a1f4c00234b9a56"
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add a product to cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 example: "65fd27948a1f4c00234b9c21"
 *               quantity:
 *                 type: number
 *                 example: 1
 *               user:
 *                 type: string
 *                 example: "65fd26cd8a1f4c00234b9a56"
 *     responses:
 *       201:
 *         description: Item added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Invalid data
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Fetch cart items for logged-in user
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Successfully fetched user's cart
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 */

/**
 * @swagger
 * /cart/{id}:
 *   patch:
 *     summary: Update cart item (e.g., change quantity)
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *                 example: 3
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart item not found
 */

/**
 * @swagger
 * /cart/{id}:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item ID
 *     responses:
 *       200:
 *         description: Cart item deleted successfully
 *       404:
 *         description: Cart item not found
 */

const express = require("express");
const {
  addToCart,
  fetchCartByUser,
  updateCart,
  deleteFromCart,
} = require("../controller/Cart");
const router = express.Router();

router
  .post("/", addToCart)
  .get("/", fetchCartByUser)
  .patch("/:id", updateCart)
  .delete("/:id", deleteFromCart);

exports.router = router;
