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
import {
    SignUp,
    loader as signupLoader,
    action as signupAction,
} from "./routes/signUp";
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
    {
        path: "/auth/sign-up",
        loader: signupLoader,
        action: signupAction,
        element: <SignUp />,
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
