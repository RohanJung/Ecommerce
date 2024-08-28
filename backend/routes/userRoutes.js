import express from "express";
import { createUser } from "../controllers/userControllers.js";

const  router = express.Router();

router.get('/',createUser)

export default router;