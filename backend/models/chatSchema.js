import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, default: "Ask a question" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { collection: 'chats' });

const Chat = mongoose.model("Chat", chatSchema);

export { Chat };