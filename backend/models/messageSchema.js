import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    userId: { type: String, required: true},
    chatId: {type: String, required: true},
    content: { type: String, required: true},
    sender: { type: String, enum: ['user', 'bot'], required: true },
    createdAt: {type: Date, default: Date.now}
}, {collection: 'messages'})

const Message = mongoose.model("Message", messageSchema)

export { Message };