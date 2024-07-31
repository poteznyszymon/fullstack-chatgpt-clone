export default interface ChatModel {
  _id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessageModel {
  _id: string;
  userId: string;
  chatId: string;
  content: string;
  sender: string;
  createdAt: string;
}
