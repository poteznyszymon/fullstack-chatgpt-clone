import PromptTile from "@/components/promptTile";
import ChatInput from "@/components/shared/ChatInput";
import useAddChat from "@/hooks/chats/useAddChat";
import { Brain, FileText, Gift, GraduationCap } from "lucide-react";
import { useState } from "react";

const HomePage = () => {
  const [inputText, setInputText] = useState("");
  const { addChat, isPending } = useAddChat({
    onHomePage: true,
    prompt: inputText,
  });

  return (
    <div className="w-full h-full flex-col flex justify-center items-center gap-5">
      <h1 className="text-3xl font-semibold">What can I help with?</h1>
      <ChatInput
        onClick={() => {
          addChat();
        }}
        userInput={inputText}
        setUserInput={setInputText}
        isLoading={isPending}
      />
      <div className="flex items-center justify-center flex-wrap gap-4">
        <PromptTile
          onClick={() => {
            setInputText("Tell a joke");
            addChat();
          }}
          icon={<Brain className="size-4 text-fuchsia-500" />}
          text="Tell a joke"
        />
        <PromptTile
          onClick={() => {
            setInputText("Tell advice");
            addChat();
          }}
          icon={<GraduationCap className="size-4 text-cyan-500" />}
          text="Tell advice"
        />
        <PromptTile
          onClick={() => {
            setInputText("Write essay");
            addChat();
          }}
          icon={<FileText className="size-4 text-green-500" />}
          text="Write essay"
        />
        <PromptTile
          onClick={() => {
            setInputText("Suprise me");
            addChat();
          }}
          icon={<Gift className="size-4 text-yellow-300" />}
          text="Suprise me"
        />
      </div>
      <p className="text-xs fixed bottom-0 text-footer-gray mb-[3px] h-[20px]">
        ChatAI can make mistakes. Check important info.
      </p>
    </div>
  );
};

export default HomePage;
