import express from "express";
import { createUser,loginUser,logoutUser,getAllUsers } from "../controllers/userControllers.js";
import { authenticate,authorizeAdmin } from "../middlewares/authMiddleware.js";
const  router = express.Router();

router.post('/',createUser);
router.get('/',authenticate,authorizeAdmin,getAllUsers);
router.post('/auth',loginUser);
router.get('/logout',logoutUser);
export default router;