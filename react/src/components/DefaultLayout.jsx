import { Link, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
    const { user, token, notification, setUser, setToken, setNotification } =
        useStateContext();

    if (!token) {
        return <Navigate to="/login" />; // user tries to access a protected route without being authenticated
    }

    const onLogout = (event) => {
        event.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser(null);
            setToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <div id="defaultLayout">
            <aside>
                {" "}
                {/* This is where the sidebar will be rendered */}
                <Link to="/users">Users</Link>
                <Link to="/dashboard">Dashboard</Link>
            </aside>
            <div className="content">
                <header>
                    <div>Header</div>
                    <div>
                        Authenticated User Information:
                        {user && user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />{" "}
                    {/* This is where the child routes will be rendered */}
                </main>
            </div>

            {notification && <div className="notification">{notification}</div>}
        </div>
    );
}
