import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import { protect } from "./middleware/authMiddleware.js";
import aiRouter from "./routes/ai.route.js";
dotenv.config();

const app = express();
// Middleware to parse JSON
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", protect, (req, res) => {
 res.send("api is running")
});
app.use("/api/auth", authRouter);
app.use("/api/ai", protect, aiRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
