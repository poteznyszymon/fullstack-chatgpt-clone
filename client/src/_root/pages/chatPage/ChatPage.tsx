import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { Message } from "@/lib/types";
import ChatInput from "@/components/shared/ChatInput";

const ChatPage = () => {
  const [userInput, setUserInput] = useState("");
  const isLoading = false;
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <main className="h-full w-full flex flex-col px-4 items-center pt-[48px] pb-[80px] bg-main-gray">
      <div className="flex flex-col h-full py-4 items-center overflow-y-scroll w-full max-w-[730px] gap-4 no-scrollbar scroll-smooth ">
        {messages.map((item) =>
          item.sender === "user" ? (
            <div
              key={item._id}
              className="py-3 self-end px-5 bg-menu-gray rounded-3xl"
            >
              {item.content}
            </div>
          ) : (
            <Markdown
              key={item._id}
              className="self-start lg:w-full w-96 md:w-full"
            >
              {item.content}
            </Markdown>
          )
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="w-full flex items-center justify-center flex-col gap-2 fixed bottom-0 z-10 bg-main-gray h-[90px]  right-[50%] translate-x-[50%] lg:right-auto lg:translate-x-0">
        <ChatInput
          userInput={userInput}
          setUserInput={setUserInput}
          isLoading={isLoading}
        />
        <p className="text-xs text-footer-gray mb-[3px] h-[20px]">
          ChatAI can make mistakes. Check important info.
        </p>
      </div>
    </main>
  );
};

export default ChatPage;
