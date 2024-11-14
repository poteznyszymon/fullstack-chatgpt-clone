import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createChat, deleteChat } from "../controllers/chats.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createChat);
router.delete("/:chatId", verifyToken, deleteChat);

export default router;
