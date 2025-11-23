const express = require("express");
const {
  createProduct,
  fetchAllproducts,
  fetchProductById,
  updateProduct,
} = require("../controller/Product");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - brand
 *         - category
 *         - price
 *         - thumbnail
 *         - images
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         brand:
 *           type: string
 *         category:
 *           type: string
 *         price:
 *           type: number
 *         stock:
 *           type: number
 *           default: 0
 *         thumbnail:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         rating:
 *           type: number
 *           default: 0
 *         discountPercentage:
 *           type: number
 *           default: 0
 *         deleted:
 *           type: boolean
 *           default: false
 *       example:
 *         title: iPhone 15
 *         description: Latest Apple iPhone
 *         brand: Apple
 *         category: Smartphones
 *         price: 999
 *         stock: 10
 *         thumbnail: "https://example.com/iphone.jpg"
 *         images:
 *           - "https://example.com/img1.jpg"
 *           - "https://example.com/img2.jpg"
 *         rating: 4.5
 *         discountPercentage: 10
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 */
router.get("/", fetchAllproducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get("/:id", fetchProductById);

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.patch("/:id", updateProduct);

exports.router = router;
