import { User } from "../models/userSchema.js";
import { Chat } from "../models/chatSchema.js";

export const createChat = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const newChat = new Chat({ userId });
    newChat.save();

    return res.status(200).json({
      success: true,
      message: "Chat created successfully",
      chat: newChat,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ success: false, error: "Chat not found" });
    }

    await Chat.deleteOne({ _id: chatId });

    return res.status(200).json({
      success: true,
      message: "Chat deleted successfully",
      chat: chat,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export const getAllChats = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const chats = await Chat.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({ success: true, chats: chats });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
