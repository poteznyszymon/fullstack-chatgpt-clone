import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoute from "./routes/auth.route.js";
import chatsRoute from "./routes/chats.route.js";
import messagesRoute from "./routes/messages.route.js";

import { connectToMongo } from "./mongo/connectToDatabase.js";
import cookieParser from "cookie-parser";

import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", authRoute);
app.use("/api/chats", chatsRoute);
app.use("/api/messages", messagesRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  connectToMongo();
});
