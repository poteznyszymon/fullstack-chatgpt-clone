import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Chat } from "./models/chatSchema.js";
import { Message } from "./models/messageSchema.js";

const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());

const CONNECTION_STRING = "mongodb+srv://szymonfularczyk:szymon123@cluster0.ztwisz4.mongodb.net/chatai?retryWrites=true&w=majority&appName=Cluster0";

const connect = async () => {
  try {
    await mongoose.connect(CONNECTION_STRING);
    console.log("connected successfully");
  } catch (error) {
    console.log(error);
  }
};


app.get("/", (req, res) => {
  res.json("Hello vercel!");
})

app.post("/add-chat", async (req, res) => {
  try {
    const { userId, title = "Ask a question" } = req.body;
    const newChat = new Chat({ userId, title });
    await newChat.save();
    res.status(201).send(newChat);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/get-chats/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const chats = await Chat.find({ userId });
    res.status(200).send(chats);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


app.delete("/delete-chat/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findByIdAndDelete(id);
    if (!chat) {
      return res.status(404).send("Chat not found");
    }

    await Message.deleteMany({ chatId: id });
    res.status(200).send("Chat and associated messages deleted successfully");
    
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post("/add-message/:userId/:chatId/:content/:sender", async (req, res) => {
  try {
    const { userId, chatId, content, sender } = req.params;
    const newMessage = new Message({ userId, chatId, content, sender });
    await newMessage.save();
    res.status(201).send(newMessage);
  } catch {
    res.status(400).send(error.message);
  }
})

app.get("/get-messages/:chatId", async (req, res) => {
  try {
    const { chatId } = req.params
    const messages = await Message.find({ chatId });
    res.status(200).send(messages);
  } catch (error) {
    res.status(400).send(error.message);
  }
})

app.put("/change-title/:chatId/:newTitle", async (req, res) => {
  try {
    const { chatId, newTitle } = req.params;
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { title: newTitle, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedChat) {
      return res.status(404).send("Chat not found");
    }
    res.status(200).send(updatedChat);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const startServer = async () => {
  await connect();
  app.listen(port);
};

startServer();
