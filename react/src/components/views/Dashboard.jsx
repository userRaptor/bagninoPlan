import React from "react";
import Header from "../Header";

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";

export default function Dashboard() {
    const addUserSuccNotification = () => {
        toast.success("The user was added successfully!", {
            position: "bottom-right",
        });
    };

    return (
        <div>
            <Header />
            <h1>DASHBOARD</h1>

            <button onClick={addUserSuccNotification}>Notify</button>
            <ToastContainer />
        </div>
    );
}
