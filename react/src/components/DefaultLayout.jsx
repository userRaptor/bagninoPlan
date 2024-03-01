import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
    return (
        <div>
            Default:
            <Outlet /> {/* This is where the child routes will be rendered */}
        </div>
    );
}
