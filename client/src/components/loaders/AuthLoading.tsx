import { Loader2 } from "lucide-react";
import { FaCircle } from "react-icons/fa";

const AuthLoading = () => {
  return (
    <div className="h-screen flex flex-col">
      <nav className=" text-main-purple px-8 py-6 text-2xl font-semibold">
        <div className=" flex items-center gap-1">
          <span className="text-3xl font-bold leading-[140%] tracking-tighter">
            ChatAI
          </span>
          <div>
            <FaCircle size={18} />
          </div>
        </div>
      </nav>
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    </div>
  );
};

export default AuthLoading;
