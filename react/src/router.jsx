import { createBrowserRouter } from "react-router-dom";

import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import Dashboard from "./views/Dashboard";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
    {
        path: "*",
        element: (
            <div>
                <h1> ERROR 404 - NOT FOUND VIEW!!!</h1>
            </div>
        ),
    },
]);

export default router;
