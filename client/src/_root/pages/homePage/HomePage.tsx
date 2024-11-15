import ChatInput from "@/components/shared/ChatInput";
import { useState } from "react";

const HomePage = () => {
  const [inputText, setInputText] = useState("");

  return (
    <div className="w-full h-full flex-col flex justify-center items-center gap-5">
      <h1 className="text-3xl font-semibold">What can I help with?</h1>
      <ChatInput
        userInput={inputText}
        setUserInput={setInputText}
        isLoading={false}
      />
    </div>
  );
};

export default HomePage;
