import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import orderRoutes from './routes/orderRoutes.js';
import customerRoutes from "./routes/customerRoutes.js";

dotenv.config();
const app = express();

// Connect DB
connectDB();

// Middleware
const allowedOrigins = [
  "http://localhost:5173", // Local dev
  "https://e-commerce-r1x7.vercel.app" // Your deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);
app.use('/api/orders', orderRoutes);
app.use("/api/customers", customerRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Backend is live and connected!");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
