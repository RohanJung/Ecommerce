import express from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { createProduct } from "../controllers/productController";

const router = express.Router();

router.post("/", createProduct);
export default router;
