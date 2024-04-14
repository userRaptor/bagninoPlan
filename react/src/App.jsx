import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/views/auth/Login";
import Signup from "./components/views/auth/Signup";
import Users from "./components/views/Users";
import Dashboard from "./components/views/Dashboard";
import UserForm from "./components/views/UserForm";
import NewOrderWithGroceries from "./components/views/orders/NewOrderWithGroceries";
import NewGroceries from "./components/views/groceries/NewGroceries";
import MyOrders from "./components/views/orders/myOrders/MyOrders";

import Testing from "./components/otherStuff/Testing";

function App() {
    useEffect(() => {
        document.title = "EduEat";
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/testing" element={<Testing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/" element={<Dashboard />} />

                {/* 
                <Route path="/" element={<DefaultLayout />} />
                <Route path="/" element={<GuestLayout />} />
                */}

                <Route path="/users" element={<Users />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                    path="/users/new"
                    element={<UserForm key="userCreate" />}
                />
                <Route
                    path="/users/:id"
                    element={<UserForm key="userUpdate" />}
                />
                <Route path="/neworder" element={<NewOrderWithGroceries />} />
                <Route path="/newgroceries" element={<NewGroceries />} />
                <Route path="/myorders" element={<MyOrders />} />

                <Route
                    path="*"
                    element={
                        <div>
                            <h1> ERROR 404 - NOT FOUND VIEW!!!</h1>
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
