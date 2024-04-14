import React from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useState, useRef } from "react";
import { Button, Flex, Input } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


import "./Login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        const payload = {
            email: email,
            password: password,
        };

        setErrors(null);

        axiosClient
            .post("/login", payload)
            .then((data) => {
                setToken(data.token);
                setUser(data.user);
                //console.log(data);
                //console.log(data.user);
                navigate('/dashboard');
            })
            .catch((error) => {
                const response = error.response;
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message],
                        });
                    }
                    console.log(response.data.errors);
                }
            });
    };
    /////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div className="background-image">
            <Flex>
                <Box
                    bg="lightgreen"
                    w="100%"
                    p={4}
                    color="black"
                    m={100}
                    ml={500}
                    mr={500}
                >
                    <Text fontSize="3xl">WELCOME to EduEat</Text>
                    <Text fontSize="lg">Login into your account:</Text>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            margin: "20px",
                        }}
                    >
                        <h1 style={{ marginRight: "40px" }}>E-Mail:</h1>
                        <Input
                            variant="outline"
                            placeholder="Email"
                            type="email"
                            style={{ width: "300px" }}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            margin: "20px",
                        }}
                    >
                        <h1 style={{ marginRight: "15px" }}>Password:</h1>
                        <Input
                            variant="outline"
                            placeholder="Password"
                            type="password"
                            style={{ width: "300px" }}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </div>
                    <Button
                        style={{
                            margin: "20px",
                            marginLeft: "120px",
                            width: "200px",
                            backgroundColor: "darkgreen",
                            color: "white",
                        }}
                        onClick={onSubmit}
                    >
                        LOGIN
                    </Button>
                    <div>
                        <p>
                            Not registered?{" "}
                            <Link to="/signup" style={{ color: 'green' }}>Create an account</Link>
                        </p>
                    </div>
                </Box>
            </Flex>
        </div>
    );
}

/*
<input ref={emailRef} placeholder="Email" type="email" />
                <input
                    ref={passwordRef}
                    placeholder="Password"
                    type="password"
                />




<form onSubmit={onSubmit}>
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}

                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not registered?{" "}
                        <Link to="/signup">Create an account</Link>
                    </p>
                </form>








                */
