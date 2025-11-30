/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Product brand management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       required:
 *         - value
 *         - label
 *       properties:
 *         id:
 *           type: string
 *         value:
 *           type: string
 *           example: "apple"
 *         label:
 *           type: string
 *           example: "Apple"
 */

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: Successfully fetched all brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 */

/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *     responses:
 *       201:
 *         description: Brand created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       400:
 *         description: Invalid or duplicate brand data
 */

const express = require("express");
const { fetchBrands, createBrands } = require("../controller/Brand");
const router = express.Router();

router.get("/", fetchBrands).post("/", createBrands);

exports.router = router;
