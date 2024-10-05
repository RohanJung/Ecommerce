import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getProfileDetail,
  updateProfileDetail,
  deleteUserbyId,
  findUserById,
  updateUserbyId,
} from "../controllers/userControllers.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", createUser);
router.get("/", authenticate, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router
  .route("/profile")
  .get(authenticate, getProfileDetail)
  .put(authenticate, updateProfileDetail);
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserbyId)
  .get(authenticate, authorizeAdmin, findUserById)
  .put(authenticate, authorizeAdmin, updateUserbyId);

router.post("/logout", logoutUser);
export default router;
