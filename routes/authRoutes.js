import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// router object
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - lastName
 *         - email
 *         - password
 *         - location
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated user ID
 *           example: "64f1a2b3c4d5e6f7890abcd1"
 *         name:
 *           type: string
 *           example: "Ram"
 *         lastName:
 *           type: string
 *           example: "Kumar"
 *         email:
 *           type: string
 *           format: email
 *           example: "ram@gmail.com"
 *         password:
 *           type: string
 *           format: password
 *           minLength: 6
 *           example: "123456"
 *         location:
 *           type: string
 *           example: "Odisha, India"
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post("/register", limiter, registerController);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user and get token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "ram@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", limiter, loginController);

// export
export default router;