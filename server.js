// API Documentation
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import express from "express";
import "express-async-error";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";

// security packages
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";

// files imports
import connectDB from "./config/db.js";

// routes imports
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// middleware
import errorMiddleware from "./middelwares/errorMiddleware.js";

// env config
dotenv.config();

// connect DB
connectDB();

// swagger config
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal API",
      version: "1.0.0",
      description: "API documentation for Job Portal Backend",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // route files
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// app init
const app = express();

// middlewares
app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(hpp());

app.use(express.json());
app.use(morgan("dev"));

// swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes);

// error middleware
app.use(errorMiddleware);

// port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(
    `Node server running in ${process.env.DEV_MODE} mode on port ${PORT}`
      .bgCyan.white
  );
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`.yellow);
});