import React, { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

import "./Login.css";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();

    const onSubmit = (event) => {
        event.preventDefault();
        const payload = {
            name: firstName + " " + lastName,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
        };

        console.log(payload);

        axiosClient
            .post("/signup", payload)
            .then((data) => {
                setToken(data.token);
                setUser(data.user);
            })
            .catch((error) => {
                const response = error.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            });
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div>
            <Flex>
                <Box bg="white" w="100%" p={4} color="black" m={10}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            margin: "5px",
                        }}
                    >
                        <div className="input-field">
                            <h1>E-Mail:</h1>
                            <Input
                                variant="outline"
                                placeholder="E-Mail"
                                type="email"
                                style={{ width: "300px" }}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />
                        </div>
                        <div className="input-field">
                            <h1>Firstname:</h1>
                            <Input
                                variant="outline"
                                placeholder="Firstname"
                                type="text"
                                style={{ width: "300px" }}
                                onChange={(event) => {
                                    setFirstName(event.target.value);
                                }}
                            />
                        </div>
                        <div className="input-field">
                            <h1>Lastname:</h1>
                            <Input
                                variant="outline"
                                placeholder="Lastname"
                                type="text"
                                style={{ width: "300px" }}
                                onChange={(event) => {
                                    setLastName(event.target.value);
                                }}
                            />
                        </div>
                        <div className="input-field">
                            <h1>Password:</h1>
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
                        <div className="input-field">
                            <h1>Confirm Password:</h1>
                            <Input
                                variant="outline"
                                placeholder="Confirm Password"
                                type="password"
                                style={{ width: "300px" }}
                                onChange={(event) => {
                                    setPasswordConfirmation(event.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div style={{ marginTop: "30px" }}>
                        <Button onClick={onSubmit}>Submit</Button>
                        <p className="message">
                            Already registered? <Link to="/login">Login</Link>
                        </p>
                    </div>
                </Box>
            </Flex>
        </div>
    );
}
