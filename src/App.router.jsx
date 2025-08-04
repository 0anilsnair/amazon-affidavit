import { createHashRouter } from "react-router-dom";
import ProtectedRoute from "./Protected.router";
import AppLayout from "./common/components/AppLayout/AppLayout";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

export const router = createHashRouter([
  {
    path: "app",
    element: <ProtectedRoute Component={<AppLayout />} />,
    children: [
      {
        path: "admin",
        lazy: () => import("./pages/AdminDashboard/AdminDashboard"),
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Dashboard/>,
  },
  {
    path: "*",
    element: <Dashboard/>,
  },
]);
