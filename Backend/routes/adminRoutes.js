import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Public routes
router.post("/signup", registerAdmin); // /api/admin/signup
router.post("/login", loginAdmin);     // /api/admin/login

// ✅ Protected route (Optional: for testing)
router.get("/dashboard", protect("admin"), (req, res) => {
  res.status(200).json({
    message: `Welcome Admin!`,
    user: req.user, // contains: id, role
  });
});

export default router;
