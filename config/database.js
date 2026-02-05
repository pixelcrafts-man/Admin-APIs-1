import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Neon requires SSL
  },
});

pool.on("connect", () => {
  console.log("✅ [DB] PostgreSQL connected successfully");
});

pool.on("error", (err) => {
  console.error("❌ [DB] Unexpected error on PostgreSQL client", err);
  process.exit(1);
});

// Optional: test connection on startup
export const testDbConnection = async () => {
  try {
    const res = await pool.query("SELECT 1");
    console.log("🟢 [DB] Connection test query success");
    return true;
  } catch (error) {
    console.error("🔴 [DB] Connection test failed:", error.message);
    return false;
  }
};
