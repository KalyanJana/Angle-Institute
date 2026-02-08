import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export function setupApp(): Express {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Logger middleware
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });

  return app;
}

export function setupStaticFiles(app: Express) {
  const clientBuildPath = path.resolve(__dirname, "../../client/dist");
  app.use(express.static(clientBuildPath));
  // SPA fallback - match any path not starting with /api
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}
