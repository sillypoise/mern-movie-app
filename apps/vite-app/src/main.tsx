import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound404 from "./routes/404";
import { Home } from "./routes/home";
import {
    Login,
    loader as loginLoader,
    action as loginAction,
} from "./routes/login";
import { Root, loader as rootLoader } from "./routes/root";
import "./styles/tailwind.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFound404 />,
        loader: rootLoader,
        children: [
            {
                path: "/home",
                element: <Home />,
            },
        ],
    },
    {
        path: "/auth/login",
        loader: loginLoader,
        action: loginAction,
        element: <Login />,
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
