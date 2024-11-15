import { Loader2 } from "lucide-react";
import NavBar from "../NavBar";

const RootLoading = () => {
  return (
    <div className="flex">
      <main
        className={`h-screen flex-1 flex flex-col font-inter bg-main-gray transition-all duration-500 
          
        `}
      >
        <NavBar showDrawerIcon={true} />
        <section className="flex-grow bg-main-gray flex  justify-center items-center">
          <Loader2 className="animate-spin text-background" />
        </section>
      </main>
    </div>
  );
};

export default RootLoading;
