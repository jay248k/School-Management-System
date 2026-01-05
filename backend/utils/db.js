import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv'
dotenv.config();
const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_Psi6RyhIgo9S@ep-damp-salad-a44eyv3f-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  ssl: { rejectUnauthorized: false }
});

// Handle connection errors gracefully
pool.on('error', (err) => {
  console.error("❌ Unexpected DB pool error:", err.message);
});

// Test connection
pool.connect()
  .then((client) => {
    console.log("✅ PostgreSQL (Neon) connected successfully!");
    client.release();
  })
  .catch(err => console.error("❌ Neon DB connection error:", err.message));

export default pool;
