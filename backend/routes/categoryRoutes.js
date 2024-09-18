import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/categoryController.js";
const router = express.Router();

router.post("/", createCategory);
router.get("/", getAllCategories);
router.post("/update", updateCategory);
router.post("/delete", deleteCategory);
export default router;
