import { setupApp, setupStaticFiles } from "./config/app";
import enquiryRoutes from "./routes/enquiries";
import contactRoutes from "./routes/contact";
import { Logger } from "./utils/logger";

const app = setupApp();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const DEBUG = process.env.DEBUG === "true";

// Routes
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/enquiry", enquiryRoutes); // Alias for backwards compatibility

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Serve client static files (SPA fallback)
setupStaticFiles(app);

app.listen(PORT, () => {
  Logger.info(`Server listening on http://localhost:${PORT}`);
  Logger.info(`API docs: http://localhost:${PORT}/api/health`);
});
