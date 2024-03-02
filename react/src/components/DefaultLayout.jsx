import { Link, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";

export default function DefaultLayout() {
    const { user, token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />; // user tries to access a protected route without being authenticated
    }

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
                    <div>AuthenticatetUserInformation</div>
                </header>
                <main>
                    <Outlet />{" "}
                    {/* This is where the child routes will be rendered */}
                </main>
            </div>
        </div>
    );
}
