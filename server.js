// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/auth.js";
// import habitsRoutes from "./routes/habits.js";
// import logRoutes from "./routes/logs.js";
// import aiRoutes from "./routes/ai.js";

// import { notFound, errorHandler } from "./middleware/errorHandler.js";

// const app = express();
// // Connect to MongoDB
// const allowedOrigins = (process.env.CLIENT_URL || "")
// .split(",")
// .map((origin) => origin.trim())
// .filter(Boolean);

// const corsOptions = {
//     origin(origin, cb) {
//         if(!origin) return cb(null, true);
//         if(/https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/.test(origin)) {
//             cb(null, true);
//         }
//         if(allowedOrigins.includes(origin)) {
//             return cb(null, true);
//         }
//         return cb(new Error(`Origin ${origin} not allowed by CORS`));   
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
// }

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));
// app.use(express.json({ limit: "1mb" }));

// app.get("/api/health", (req, res) => {
//     res.json({ status: "ok", time: new Date().toISOString() });
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/habits", habitsRoutes);
// app.use("/api/logs", logRoutes); 
// app.use("/api/ai", aiRoutes);

// app.use(notFound);
// app.use(errorHandler);
// const PORT = process.env.PORT || 8000;
// connectDB().then(() => {
//     app.listen(PORT, () => {
//         console.log(`Server running on http://localhost:${PORT}`);
//     });
// });
import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import habitsRoutes from "./routes/habits.js";
import logRoutes from "./routes/logs.js";
import aiRoutes from "./routes/ai.js";

import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Build allowed origins from env
const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true);

    // ✅ Allow localhost dev ports
    if (/^https?:\/\/localhost:(3000|5173)$/.test(origin)) {
      return cb(null, true);
    }

    // ✅ Allow 127.0.0.1 with any port
    if (/^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)) {
      return cb(null, true);
    }

    // ✅ Allow explicitly configured origins
    if (allowedOrigins.includes(origin)) {
      return cb(null, true);
    }

    // ❌ Reject everything else
    return cb(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json({ limit: "1mb" }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/habits", habitsRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/ai", aiRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

