import aiModel from "../gemini/gemini.js";
import { Chat } from "../models/chatSchema.js";
import { Message } from "../models/messageSchema.js";
import { User } from "../models/userSchema.js";

export const sendMessage = async (req, res) => {
  const { chatId } = req.params;
  const { prompt } = req.body;
  const userId = req.userId;

  if (!prompt) {
    return res
      .status(200)
      .json({ success: false, error: "Prompt not provided" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(401).json({ success: false, error: "User not found" });
  }

  const chat = await Chat.findById(chatId);
  if (!chat) {
    return res.status(401).json({ success: false, error: "Chat not found" });
  }

  await Chat.findByIdAndUpdate(chatId, { title: prompt });

  const result = await aiModel.generateContent(prompt);
  const resultText = result.response.candidates[0].content.parts[0].text;

  const userMessage = new Message({
    userId,
    chatId,
    content: prompt,
    sender: "user",
  });
  await userMessage.save();

  const botMessage = new Message({
    userId,
    chatId,
    content: resultText,
    sender: "bot",
  });
  await botMessage.save();

  chat.messages.push(userMessage._id, botMessage._id);
  await chat.save();

  res.status(200).json({ success: true, response: botMessage });

  try {
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ success: false, error: "User not found" });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(400).json({ success: false, error: "Chat not found" });
    }

    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });

    return res.status(200).json({ success: true, messages: messages });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
