import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
    const addUserSuccNotification = () => {
        toast.success("The user was added successfully!", {
            position: "bottom-right",
        });
    };

    return (
        <div>
            <h1>DASHBOARD</h1>

            <button onClick={addUserSuccNotification}>Notify</button>
            <ToastContainer />
        </div>
    );
}
