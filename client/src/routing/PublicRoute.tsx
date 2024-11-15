import AuthLoading from "@/components/loaders/AuthLoading";
import useCheckAuth from "@/hooks/auth/useCheckAuth";
import { Outlet, Navigate } from "react-router-dom";

const PublicRoute = () => {
  const { user, isLoading } = useCheckAuth();

  if (isLoading) return <AuthLoading />;

  if (user) return <Navigate to={"/"} />;

  return <Outlet />;
};

export default PublicRoute;
