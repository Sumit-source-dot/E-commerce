import Employee from "../models/employeeModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerEmployee = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Employee.findOne({ email });
    if (existing) return res.status(400).json({ message: "Employee already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmp = await Employee.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: newEmp._id, role: "customer" }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ token, user: { role: "customer", email: newEmp.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    const found = await Employee.findOne({ email });
    if (!found) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, found.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: found._id, role: "customer" }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ token, user: { role: "customer", email: found.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
