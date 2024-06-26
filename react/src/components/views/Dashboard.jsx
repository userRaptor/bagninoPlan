import React from "react";
import { useState } from "react";
import { Button } from "@chakra-ui/react";

import { Text } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Header from "../Header";
import EducoLogo from "./../img/EducoLogo.png";

import axiosClient from "../../axios-client";

import { useStateContext } from "../../contexts/ContextProvider";


export default function Dashboard() {
    const [userName, setUserName] = useState('');

    const { user, token } = useStateContext();

    const getUser = () => {
        axiosClient.get('/user')
            .then((response) => {
                console.log(response.data);
                setUserName(response.data.name);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const addUserSuccNotification = () => {
        toast.success("Welcome to EduEat!", {
            position: "bottom-right",
        });
    };

    return (
        <div>
            <Header title="" />

            {token ? 'Token exits' : 'No Token'}


            <Button onClick={getUser}>Load Username</Button>
            {/**
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px'}}>
                <img src={welcomeIMG} alt="welcome" style={{ width: '35%', height: 'auto' }}/>
                <Text fontSize='6xl' onClick={addUserSuccNotification} style={{cursor: 'pointer'}}>to EduEat</Text>
            </div>  
             */}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px'}}>
                <img src={EducoLogo} alt="welcome" style={{ width: '50%', height: 'auto' }}/>
            </div>    

            <ToastContainer />
        </div>
    );
}
