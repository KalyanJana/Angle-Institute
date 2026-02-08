import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import submissionsRoutes from "./routes/submissions";
import authRoutes from "./routes/auth";
import adminRoutes from "./routes/admin";
import coursesRoutes from "./routes/courses";
import { Logger } from "./utils/logger";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/courses", coursesRoutes);
app.use("/api/submissions", submissionsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
// Note: `/api/enquiries` and `/api/contact` routes removed — not used by client UI

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  Logger.info(`Server listening on http://localhost:${PORT}`);
  Logger.info(`API docs: http://localhost:${PORT}/api/health`);
  // Connect to MongoDB
  connectDB();
});
