const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: This API is responsible for the login process
 *     description: This API handles user login, validates credentials, and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *             required:
 *               - username
 *               - password
 *     responses:
 *       "200":
 *         description: Login successful, returns a JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       "400":
 *         description: Invalid username or password
 *       "500":
 *         description: Server error
 */
router.post('/login', loginUser);

module.exports = router;