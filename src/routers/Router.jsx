import { createHashRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Edit from "../pages/Edit";
import Create from "../pages/Create";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PostDetail from "../pages/PostDetail";
import Author from "../pages/Author";

const router = createHashRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        { path: "edit/:id", element: <Edit /> },
        { path: "create", element: <Create /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "post/:id", element: <PostDetail /> },
        { path: "author/:id", element: <Author /> },
      ],
    },
  ],
  { basename: "/blog-mern-frontend-exam" },
);

export default router;
