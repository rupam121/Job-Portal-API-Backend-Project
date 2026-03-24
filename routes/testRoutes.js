import express from "express";
import { testPostController } from "../controllers/testControler.js";
import userAuth from "../middelwares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Test
 *   description: Test APIs
 */

/**
 * @swagger
 * /api/v1/test/test-post:
 *   post:
 *     summary: Test API endpoint
 *     description: This API is used for testing server functionality
 *     tags: [Test]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               message: "Hello from client"
 *     responses:
 *       200:
 *         description: Test successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Test API working"
 */
router.post("/test-post", testPostController);

export default router;