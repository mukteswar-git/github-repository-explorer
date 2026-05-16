import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import RepoDetails from "../pages/RepoDetails";
import UserProfile from "../pages/UserProfile";
import NotFound from "../pages/NotFound";

console.log("RepoDetails rendered");

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "repos/:owner/:repo",
        element: <RepoDetails />,
      },

      {
        path: "users/:username",
        element: <UserProfile />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
