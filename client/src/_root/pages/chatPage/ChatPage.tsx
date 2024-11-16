import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import ChatInput from "@/components/shared/ChatInput";
import useGetMessages from "@/hooks/messages/useGetMessages";
import { useLocation, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useSendMessage from "@/hooks/messages/useSendMessage";

const ChatPage = () => {
  const hasSentInitialPromptRef = useRef(false);
  const [userInput, setUserInput] = useState("");
  const { chatId } = useParams();
  const { sendMessage, isPending } = useSendMessage();

  const location = useLocation();
  const { prompt } = location.state || {};

  const { messages, isLoading } = useGetMessages(chatId || "");

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (userInput.trim() && chatId) {
      sendMessage({ chatId, prompt: userInput });
      setUserInput("");
    }
  };

  useEffect(() => {
    if (prompt && chatId && !hasSentInitialPromptRef.current) {
      sendMessage({ chatId, prompt });
      hasSentInitialPromptRef.current = true;
    }
  }, [chatId, prompt, sendMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <main className="h-full w-full flex flex-col px-4 items-center pt-[48px] pb-[80px] bg-main-gray">
      <div className="flex flex-col h-full py-4 items-center overflow-y-scroll w-full max-w-[730px] gap-4 no-scrollbar scroll-smooth ">
        {!isLoading &&
          messages &&
          messages.map((item) =>
            item.sender === "user" ? (
              <div
                key={item._id}
                className="self-end py-3 px-5 bg-menu-gray rounded-3xl"
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
        {isLoading && <Loader2 className="mt-auto mb-auto animate-spin" />}
        <div ref={messagesEndRef} />
      </div>
      <div className="w-full flex items-center justify-center flex-col gap-2 fixed bottom-0 z-10 bg-main-gray h-[90px]  right-[50%] translate-x-[50%] lg:right-auto lg:translate-x-0">
        <ChatInput
          onClick={handleSendMessage}
          userInput={userInput}
          setUserInput={setUserInput}
          isLoading={isLoading || isPending}
        />
        <p className="text-xs text-footer-gray mb-[3px] h-[20px]">
          ChatAI can make mistakes. Check important info.
        </p>
      </div>
    </main>
  );
};

export default ChatPage;
