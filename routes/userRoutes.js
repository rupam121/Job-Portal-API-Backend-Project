import express from "express";
import userAuth from "../middelwares/authMiddleware.js";
import { updateUserController } from "../controllers/userController.js";

// router object
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User profile APIs
 */

/**
 * @swagger
 * /api/v1/user/update-user:
 *   put:
 *     summary: Update user profile
 *     description: Update logged-in user details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ram"
 *               lastName:
 *                 type: string
 *                 example: "Kumar"
 *               email:
 *                 type: string
 *                 example: "ram@gmail.com"
 *               location:
 *                 type: string
 *                 example: "Bhubaneswar, India"
 *     responses:
 *       200:
 *         description: User updated successfully
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
 *                   example: "User updated successfully"
 *       401:
 *         description: Unauthorized
 */
router.put("/update-user", userAuth, updateUserController);

export default router;