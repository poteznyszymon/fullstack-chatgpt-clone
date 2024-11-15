import { FaArrowUp } from "react-icons/fa";

interface ChatInputProps {
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  onClick: () => void;
}

const ChatInput = ({
  userInput,
  setUserInput,
  isLoading,
  onClick,
}: ChatInputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClick();
  };
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[750px]">
      <div className="bg-menu-gray w-full h-[50px] rounded-3xl flex items-center justify-between px-[10px] mt-[10px]">
        <div className="flex items-center gap-4 flex-1 pr-3">
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            type="text"
            className="bg-transparent pl-5 border-none placeholder:text-placeholder-gray grow outline-none"
            placeholder="Message ChatAI"
          />
        </div>
        <button
          disabled={!userInput || isLoading}
          className={`rounded-full h-8 w-8 flex items-center justify-center ${
            userInput && !isLoading ? "bg-white" : "bg-icon-gray"
          }`}
        >
          {!isLoading ? (
            <FaArrowUp className="text-main-gray" />
          ) : (
            <img src="/loading-icon-white.svg" className="w-5 h-5" />
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
