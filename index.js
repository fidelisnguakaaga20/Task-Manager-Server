// const express = require('express');
// require('dotenv').config();
// const app = express();
// const connectDB = require('./connect');
// const cors = require("cors");
// const router = require("./routes/tasks");

// app.use(cors());
// app.use(express.json());
// app.use("/api/v1/tasks", router);

//         const start = async () => {
//     try {
//         await connectDB(process.env.MONGO_URI)
//         app.listen(process.env.PORT, () => console.log("Server started..."));
//     } catch (error) {
//         console.log(err)
//     }
// };

// start();

// server/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./connect");
const router = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;

// ---- CORS (allow localhost + Vercel client) ----
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL, // e.g. https://task-manager-client-amber.vercel.app
].filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      // allow curl/Postman/same-origin (no Origin header)
      if (!origin) return cb(null, true);

      // normalize trailing slash before comparing
      const norm = origin.replace(/\/$/, "");
      const list = allowedOrigins.map((o) => o.replace(/\/$/, ""));

      if (list.includes(norm)) return cb(null, true);
      return cb(new Error("CORS blocked for " + origin));
    },
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

app.use(express.json());

// Simple health check (handy for Render)
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// API routes
app.use("/api/v1/tasks", router);

// Boot
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Database connected…");
    app.listen(PORT, () => console.log(`Server started on ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
