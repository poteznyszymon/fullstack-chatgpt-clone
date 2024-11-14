import express from "express";
import {
  getAllMessages,
  sendMessage,
} from "../controllers/messages.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/send/:chatId", verifyToken, sendMessage);
router.get("/:chatId", verifyToken, getAllMessages);

export default router;
