import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyAuth,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/check-auth", verifyToken, verifyAuth);

export default router;
