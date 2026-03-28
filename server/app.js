require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { sequelize, connectWithRetry } = require("./src/config/db");

// 🔌 ROUTES
const authRoutes = require("./src/routes/auth.routes");
const taskRoutes = require("./src/routes/task.routes");

const app = express();

/* =========================
   🔐 SECURITY MIDDLEWARE
========================= */
app.use(helmet());

/* =========================
   📊 LOGGER
========================= */
app.use(morgan("dev"));

/* =========================
   📦 BODY PARSER
========================= */
app.use(express.json());

/* =========================
   🌐 CORS CONFIG
========================= */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
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
   ❤️ HEALTH CHECK
========================= */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

/* =========================
   🏠 ROOT
========================= */
app.get("/", (req, res) => res.send("API running 🚀"));

/* =========================
   🔗 API ROUTES (GROUPED)
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

/* =========================
   ❌ 404 HANDLER (IMPORTANT)
========================= */
app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.originalUrl}`,
  });
});

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

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();