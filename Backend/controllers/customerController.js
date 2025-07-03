import Customer from "../models/customerModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id, role: "customer" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const registerCustomer = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await Customer.findOne({ email });
  if (userExists) return res.status(400).json({ message: "Customer already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const customer = await Customer.create({ name, email, password: hashedPassword });
  res.status(201).json({
    success: true,
    token: generateToken(customer._id),
    customerId: customer._id,
  });
};

export const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  const customer = await Customer.findOne({ email });
  if (!customer) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, customer.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  res.json({
    success: true,
    token: generateToken(customer._id),
    customerId: customer._id,
  });
};
