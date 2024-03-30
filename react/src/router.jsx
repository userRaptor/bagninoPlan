import { createBrowserRouter } from "react-router-dom";

import Login from "./components/views/Login";
import Signup from "./components/views/Signup";
import Users from "./components/views/Users";
import Dashboard from "./components/views/Dashboard";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import UserForm from "./components/views/UserForm";
import Bestellungen from "./components/views/Bestellungen";

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
            {
                path: "/users/new",
                element: <UserForm key="userCreate"/>,
            },
            {
                path: "/users/:id",
                element: <UserForm key="userUpdate"/>,
            },
            {
                path: "/bestellungen",
                element: <Bestellungen />,
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
