/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Product Category management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - value
 *         - label
 *       properties:
 *         id:
 *           type: string
 *         value:
 *           type: string
 *           example: "electronics"
 *         label:
 *           type: string
 *           example: "Electronics"
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all Category
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Successfully fetched all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new Category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Invalid or duplicate category data
 */

const express = require("express"); 
const { fetchCategories, createCategories } = require("../controller/Category");
const router = express.Router();

router.get("/", fetchCategories).post("/", createCategories);

exports.router = router;
