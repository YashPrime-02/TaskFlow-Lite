require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { sequelize, connectWithRetry } = require("./src/config/db");

const app = express();

/* =========================
   🔐 SECURITY MIDDLEWARE
========================= */
app.use(helmet());

/* =========================
   📊 LOGGER (DEV + PROD)
========================= */
app.use(morgan("dev"));

/* =========================
   📦 BODY PARSER
========================= */
app.use(express.json());

/* =========================
   🌐 CORS CONFIG (STRICT)
========================= */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean); // removes undefined

app.use(
  cors({
    origin: function (origin, callback) {
      // allow non-browser tools (Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
  })
);

/* =========================
   ❤️ HEALTH CHECK (Docker)
========================= */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

/* =========================
   🏠 ROOT ROUTE
========================= */
app.get("/", (req, res) => res.send("API running 🚀"));

/* =========================
   ❌ GLOBAL ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);

  if (err.message.includes("CORS")) {
    return res.status(403).json({ message: err.message });
  }

  res.status(500).json({
    message: "Internal Server Error",
  });
});

/* =========================
   🚀 START SERVER
========================= */
const startServer = async () => {
  try {
    console.log("⏳ Connecting to DB...");
    await connectWithRetry();

    console.log("📦 Syncing database...");
    await sequelize.sync();

    app.listen(process.env.PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();