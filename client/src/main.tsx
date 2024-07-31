import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import SignInForm from "./_auth/forms/SignInForm";
import SignUpForm from "./_auth/forms/SignUpForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import ErrorPage from "./components/ErrorPage";
import ChatPage from "./_root/pages/ChatPage";
import ProtectedRoute from "./_root/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Navigate to="/sign-in" /> },
      { path: "/sign-in", element: <SignInForm /> },
      { path: "/sign-up", element: <SignUpForm /> },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    path: "/home",
    children: [{ path: "/home/:id", element: <ChatPage /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
