import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (adminId) => {
  return jwt.sign({ id: adminId, role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// @route   POST /api/admin/signup
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("📥 Admin Signup Data:", { name, email });

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({ name, email, password: hashedPassword });

    console.log("✅ Admin Created in DB:", newAdmin);

    const token = jwt.sign({ id: newAdmin._id, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ token, user: { role: "admin", email: newAdmin.email } });
  } catch (error) {
    console.error("❌ Admin Signup Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route   POST /api/admin/login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(admin._id);
    res.json({ token, user: { role: "admin", email: admin.email } });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
