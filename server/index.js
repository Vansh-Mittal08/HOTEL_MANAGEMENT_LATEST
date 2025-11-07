import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js"; // ✅ Only one import for room routes
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

// Ensure the database connects before starting the server
connectDB()
  .then(() => {
    const app = express();

    // Middleware
    app.use(express.json());
    app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
    app.use(cookieParser());

    // Session configuration
    app.use(
      session({
        secret: process.env.SESSION_SECRET || "your-secret-key",
        resave: false,
        saveUninitialized: true,
        cookie: { httpOnly: true, secure: process.env.NODE_ENV === "production" },
      })
    );

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/rooms", roomRoutes); // ✅ No duplicate route imports
    app.use("/api/payment", paymentRoutes);
    app.use("/api/admin", adminRoutes);
    app.use("/api/booking-details", bookingRoutes);

    // Health Check Route
    app.get("/", (req, res) => {
      res.send("🏨 Hotel Management API is running...");
    });

    // Start Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  });
