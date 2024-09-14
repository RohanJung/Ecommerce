import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";
const router = express.Router();

router.post("/", createCategory);
router.post("/update", updateCategory);
router.post("/delete", deleteCategory);
export default router;
