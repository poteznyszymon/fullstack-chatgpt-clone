import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoute from "./routes/auth.route.js";
import chatsRoute from "./routes/chats.route.js";
import messagesRoute from "./routes/messages.route.js";

import { connectToMongo } from "./mongo/connectToDatabase.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", authRoute);
app.use("/api/chats", chatsRoute);
app.use("/api/messages", messagesRoute);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  connectToMongo();
});
