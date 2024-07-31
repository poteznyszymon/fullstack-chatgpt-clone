import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { ReactNode } from "react";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
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
  }

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default ProtectedRoute;
