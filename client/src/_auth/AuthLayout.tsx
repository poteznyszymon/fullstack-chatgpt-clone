import { Link, Outlet } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import { mockSequences } from "../data/mockSenteces";
import { Toaster } from "../components/ui/toaster";
import { ThemeProvider } from "../components/ThemeProvider";

const AuthLayout = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="h-screen text-white flex">
        <section className=" bg-dark-navy w-full hidden sm:flex sm:flex-col lg:w-2/3">
          <nav className=" text-main-purple px-8 py-6 text-2xl font-semibold">
            <Link to={"/login"} className=" flex items-center gap-1">
              <span className="text-3xl font-bold leading-[140%] tracking-tighter">
                ChatAI
              </span>
              <div>
                <FaCircle size={18} />
              </div>
            </Link>
          </nav>
          <div className="flex items-center flex-1 text-main-purple text-3xl font-bold px-8 lg:text-5xl tracking-tighter">
            <TypeAnimation
              sequence={mockSequences}
              speed={70}
              repeat={Infinity}
            />
          </div>
        </section>
        <div className="grow">
          <Outlet />
        </div>
      </main>
      <Toaster />
    </ThemeProvider>
  );
};

export default AuthLayout;
