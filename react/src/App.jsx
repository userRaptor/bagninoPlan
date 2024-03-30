import {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from "./components/views/Login";
import Signup from "./components/views/Signup";
import Users from "./components/views/Users";
import Dashboard from "./components/views/Dashboard";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import UserForm from "./components/views/UserForm";
import NeueBestellungen from './components/views/Bestellungen/NeueBestellungen';
import NewGroceries from './components/views/groceries/NewGroceries';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<DefaultLayout />} />
        <Route path="/" element={<GuestLayout />} />

        <Route path="/users" element={<Users />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users/new" element={<UserForm key="userCreate" />} />
        <Route path="/users/:id" element={<UserForm key="userUpdate" />} />
        <Route path="/neworder" element={<NeueBestellungen />} />
        <Route path="/newgroceries" element={<NewGroceries />} />
        
        
        <Route path="*" element={<div><h1> ERROR 404 - NOT FOUND VIEW!!!</h1></div>} />


      </Routes>
    </BrowserRouter>
  )
}

export default App
