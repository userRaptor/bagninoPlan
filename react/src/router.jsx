import { createBrowserRouter } from "react-router-dom";

import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import Dashboard from "./views/Dashboard";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import UserForm from "./views/UserForm";
import Bestellungen from "./views/Bestellungen";

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
