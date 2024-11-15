export interface Message {
  _id: string;
  userId: string;
  chatId: string;
  content: string;
  sender: "user" | "bot";
  createdAt: string;
}

export interface Chat {
  _id: string;
  title: string;
  messages: Message[];
  createdAt: string;
}

export interface User {
  _id: string;
  displayName: string;
  email: string;
}
