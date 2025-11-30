/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       description: Flexible address object (mixed type)
 *     Order:
 *       type: object
 *       description: Flexible order object (mixed type)
 *
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - role
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated user ID (returned via virtual field)
 *         email:
 *           type: string
 *           example: user@example.com
 *         password:
 *           type: string
 *           format: byte
 *           description: Hashed password stored as buffer
 *         role:
 *           type: string
 *           example: user
 *         addresses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Address'
 *         name:
 *           type: string
 *           example: John Doe
 *         orders:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Order'
 *         salt:
 *           type: string
 *           format: byte
 */

/**
 * @swagger
 * /users/own:
 *   get:
 *     summary: Get logged-in user details
 *     description: Returns the details of the authenticated user based on their token/session.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully fetched the logged-in user's details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized — user token missing or invalid.
 */

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update user details by ID
 *     description: Updates the user fields such as name, address, etc.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               name: "Updated Name"
 *               addresses:
 *                 - type: "Home"
 *                   city: "Pune"
 *               role: "admin"
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request — invalid input.
 *       404:
 *         description: User not found.
 */

const express = require("express");
const { fetchUserById, updateUser } = require("../controller/User");

const router = express.Router();

router.get("/own", fetchUserById).patch("/:id", updateUser);

exports.router = router;
