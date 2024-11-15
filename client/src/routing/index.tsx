import AuthLayout from "@/_auth/AuthLayout";
import ChatPage from "@/_root/pages/chatPage/ChatPage";
import RootLayout from "@/_root/RootLayout";
import ErrorPage from "@/components/ErrorPage";
import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import RegisterForm from "@/_auth/forms/RegisterForm";
import LoginForm from "@/_auth/forms/LoginForm";
import HomePage from "@/_root/pages/homePage/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "/:chatId", element: <ChatPage /> },
        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <LoginForm />,
          },
          {
            path: "/register",
            element: <RegisterForm />,
          },
        ],
      },
    ],
  },
]);
