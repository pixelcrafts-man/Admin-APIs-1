import express from "express";
import cors from "cors";

// Routes
import adminDoctorRoutes from "./routes/admin.doctor.routes.js";
import adminClinicRoutes from "./routes/admin.clinic.routes.js";
import adminPatientRoutes from "./routes/admin.patient.routes.js";
import adminDashboardRoutes from "./routes/admin.dashboard.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Basic request logger
app.use((req, res, next) => {
  console.log(`📥 [REQ] ${req.method} ${req.originalUrl}`);
  next();
});

// Base route (browser sanity check)
app.get("/", (req, res) => {
  res.send("API Working Perfectly! 🚀");
});

// Health check
app.get("/health", (req, res) => {
  console.log("💚 [HEALTH] Health check endpoint hit");
  res.status(200).json({ status: "ok", message: "Server is healthy" });
});

// Admin routes
app.use("/admin/doctors", adminDoctorRoutes);
app.use("/admin/clinics", adminClinicRoutes);
app.use("/admin/patients", adminPatientRoutes);
app.use("/admin/dashboard", adminDashboardRoutes);

// 404 handler (must be after routes)
app.use((req, res) => {
  console.warn(`⚠️ [404] Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 [ERROR] Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err?.message || "Something went wrong",
  });
});

export default app;

