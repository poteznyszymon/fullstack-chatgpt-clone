import RootLoading from "@/components/loaders/RootLoading";
import useCheckAuth from "@/hooks/auth/useCheckAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, isLoading } = useCheckAuth();

  if (isLoading) return <RootLoading />;

  if (!user) return <Navigate to={"/login"} />;

  return <Outlet />;
};

export default ProtectedRoute;
