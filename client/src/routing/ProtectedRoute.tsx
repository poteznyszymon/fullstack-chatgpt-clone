import NavBar from "@/components/NavBar";
import useCheckAuth from "@/hooks/useCheckAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, isLoading } = useCheckAuth();

  if (isLoading)
    return (
      <div className="flex">
        <main
          className={`h-screen flex-1 flex flex-col font-inter bg-main-gray transition-all duration-500 
          
        `}
        >
          <NavBar showDrawerIcon={true} />
          <section className="flex-grow bg-main-gray flex  justify-center items-center">
            <img src="/loading-icon-white.svg" className="w-5 h-5 ml-1" />
          </section>
        </main>
      </div>
    );

  if (!user) return <Navigate to={"/login"} />;

  return <Outlet />;
};

export default ProtectedRoute;
