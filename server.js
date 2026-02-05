import "dotenv/config";
import app from "./app.js";
import { testDbConnection } from "./config/database.js";

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  console.log("🚀 [SERVER] Starting server...");

  // Test DB connection before starting server
  const isDbOk = await testDbConnection();

  if (!isDbOk) {
    console.error("❌ [SERVER] Server not started due to DB connection failure");
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`✅ [SERVER] Server running on port ${PORT}`);
    console.log(`🌐 [SERVER] Health check: http://localhost:${PORT}/health`);
  });
};

startServer();
