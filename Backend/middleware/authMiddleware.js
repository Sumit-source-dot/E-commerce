import jwt from "jsonwebtoken";
import Customer from "../models/customerModel.js";
import Admin from "../models/Admin.js";

export const protect = (role = null) => async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role === "admin") {
        req.user = await Admin.findById(decoded.id).select("-password");
      } else if (decoded.role === "customer") {
        req.user = await Customer.findById(decoded.id).select("-password");
      }

      if (role && req.user.role !== role) {
        return res.status(403).json({ message: "Access denied" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

export const customerProtect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const customer = await Customer.findById(decoded.id).select('-password');

    if (!customer) {
      return res.status(401).json({ message: 'Customer not found' });
    }

    req.customer = customer; // Attach to request
    next();
  } catch (error) {
    console.error('Customer Auth Error:', error.message);
    res.status(401).json({ message: 'Unauthorized - Invalid Token' });
  }
};

