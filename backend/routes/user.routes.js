import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// Routes
router.post("/register", singleUpload("profilephoto"), register);
router.post("/login", login);
router.get("/logout", logout);
router.post(
  "/profile/update",
  isAuthenticated,
  singleUpload("resume"),
  updateProfile
);

export default router;
