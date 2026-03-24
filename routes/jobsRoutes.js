import express from "express";
import userAuth from "../middelwares/authMiddleware.js";
import {
  createJobController,
  deleteJobController,
  getAllJobsController,
  jobsStatsController,
  updateJobController,
} from "../controllers/jobsController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - company
 *         - position
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated job ID
 *           example: "65a1b2c3d4e5f67890123456"
 *         company:
 *           type: string
 *           example: "Google"
 *         position:
 *           type: string
 *           example: "Backend Developer"
 *         status:
 *           type: string
 *           enum: [pending, interview, declined]
 *           example: "pending"
 *         workType:
 *           type: string
 *           enum: [full-time, part-time, remote, internship]
 *           example: "full-time"
 *         location:
 *           type: string
 *           example: "Bangalore, India"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-01T10:00:00Z"
 */

/**
 * @swagger
 * /api/v1/job/create-job:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/create-job", userAuth, createJobController);

/**
 * @swagger
 * /api/v1/job/get-job:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of jobs
 *       401:
 *         description: Unauthorized
 */
router.get("/get-job", userAuth, getAllJobsController);

/**
 * @swagger
 * /api/v1/job/update-job/{id}:
 *   patch:
 *     summary: Update a job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Job ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: Job updated successfully
 *       404:
 *         description: Job not found
 */
router.patch("/update-job/:id", userAuth, updateJobController);

/**
 * @swagger
 * /api/v1/job/delete-job/{id}:
 *   delete:
 *     summary: Delete a job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Job ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       404:
 *         description: Job not found
 */
router.delete("/delete-job/:id", userAuth, deleteJobController);

/**
 * @swagger
 * /api/v1/job/job-stats:
 *   get:
 *     summary: Get job statistics
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Job statistics fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/job-stats", userAuth, jobsStatsController);

export default router;