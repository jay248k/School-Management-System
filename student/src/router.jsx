import { createBrowserRouter, Navigate } from "react-router-dom";
import React from "react";
import Login from "./components/auth/Login";
import StudentLayout from "./components/auth/StudentLayout";
const isAuthenticated = () => {
  return !!document.cookie.includes("token=");
};

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: isAuthenticated() ? <StudentLayout /> : <Navigate to="/login" />,
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
]);
