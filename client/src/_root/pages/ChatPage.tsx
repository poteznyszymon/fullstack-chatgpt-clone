import { useOutletContext, useParams } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { MessageModel } from "../../models/models";
import model from "../../gemini/gemini";
import Markdown from "react-markdown";

type SetNewTitleContextType = [(newTitle: string) => void];

const ChatPage = () => {
  const { id: chatId } = useParams();
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [setNewTitle] = useOutletContext<SetNewTitleContextType>();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchMessages(chatId || "");
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "") return;
    saveMessageToDb(input, "user");
    changeTitle(chatId || "", input);
    setInput("");
    setLoadingResponse(true);
    try {
      const result = await model.generateContent(input);
      const response = result.response;
      console.log(response.text());
      saveMessageToDb(response.text(), "bot");
      setLoadingResponse(false);
    } catch (error) {
      console.log(error);
      setLoadingResponse(false);
    }
    fetchMessages(chatId || "");
  };

  const fetchMessages = async (chatId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/get-messages/${chatId}`
      );
      const data = await response.json();
      setMessages(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveMessageToDb = async (content: string, sender: string) => {
    try {
      const encodedContent = encodeURIComponent(content);
      const response = await fetch(
        `http://localhost:5000/add-message/${user?.uid}/${chatId}/${encodedContent}/${sender}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }

      fetchMessages(chatId || "");
    } catch (error) {
      console.log(error);
    }
  };

  const changeTitle = async (chatId: string, newTitle: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/change-title/${chatId}/${newTitle}`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }
      setNewTitle(newTitle);
    } catch (error) {
      console.log(error);
    }
  };

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
        <form onSubmit={handleSubmit} className="w-full max-w-[750px]">
          <div className="bg-menu-gray w-full h-[50px] rounded-3xl flex items-center justify-between px-[10px] mt-[10px]">
            <div className="flex items-center gap-4 flex-1 pr-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                className="bg-transparent pl-5 border-none placeholder:text-placeholder-gray grow outline-none"
                placeholder="Message ChatAI"
              />
            </div>
            <button
              disabled={!input || loadingResponse}
              className={`rounded-full h-8 w-8 flex items-center justify-center ${
                input && !loadingResponse ? "bg-white" : "bg-icon-gray"
              }`}
            >
              {!loadingResponse ? (
                <FaArrowUp className="text-main-gray" />
              ) : (
                <img src="/loading-icon-white.svg" className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
        <p className="text-xs text-footer-gray mb-[3px] h-[20px]">
          ChatAI can make mistakes. Check important info.
        </p>
      </div>
    </main>
  );
};

export default ChatPage;
