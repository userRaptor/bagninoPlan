import { Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import React from "react";

export default function GuestLayout() {
    // To render: Login or Signup (password forgotten, etc.)

    const { token } = useStateContext();
    //debugger;

    if (token) {
        return <Navigate to="/" />; // user tries to access a protected route without being authenticated
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <Outlet />
            </div>
        </div>
    );
}
