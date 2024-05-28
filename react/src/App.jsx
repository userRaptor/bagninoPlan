import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/views/auth/Login";
import Signup from "./components/views/auth/Signup";
import Dashboard from "./components/views/Dashboard";

import NewGroceries from "./components/views/groceries/NewGroceries";
import MainNewOrderGroceries from "./components/views/orders/newOrder/MainNewOrderGroceries";
import MyOrders from "./components/views/orders/myOrders/MyOrders";

import MainUserManagment from "./components/views/userManagement/MainUserManagment";
import AllOrdersMain from "./components/views/orders/allOrders/AllOrdersMain";
import MainReuseOrder from "./components/views/orders/reuseOrder/MainReuseOrder";

import Users from "./components/views/Users";
import UserForm from "./components/views/UserForm";

import Summary from "./components/otherStuff/Summary";

function App() {
    useEffect(() => {
        //document.title = "EduEat";
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/summary" element={<Summary />} />
                
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/" element={<Dashboard />} />

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

                <Route path="/newgroceries" element={<NewGroceries />} />

                <Route path="/neworder" element={<MainNewOrderGroceries />} />
                <Route path="/reuseorder/:orderId" element={<MainReuseOrder />} />

                <Route path="/myorders" element={<MyOrders />} />
                <Route path="/allorders" element={<AllOrdersMain />} />

                <Route path="/usermanagment" element={<MainUserManagment />} />

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
