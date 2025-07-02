import express from "express";
import { registerEmployee, loginEmployee } from "../controllers/employeeController.js";

const router = express.Router();

router.post("/signup", registerEmployee);
router.post("/login", loginEmployee);

export default router;
