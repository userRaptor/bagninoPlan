import React from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useState, useRef } from "react";
import { Input } from "@chakra-ui/react";
import "./Login.css";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();

    const onSubmit = (event) => {
        event.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        setErrors(null);

        axiosClient
            .post("/login", payload)
            .then((data) => {
                setToken(data.token);
                setUser(data.user);
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

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <form onSubmit={onSubmit}>
                <h1 className="title">Login into your account</h1>
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}

                <div>
                    <Input
                        variant="outline"
                        placeholder="Email"
                        style={{ width: "70%" }}
                        type="email"
                    />
                    <Input
                        variant="outline"
                        placeholder="Password"
                        style={{ width: "70%" }}
                        type="password"
                    />
                </div>

                <input ref={emailRef} placeholder="Email" type="email" />
                <input
                    ref={passwordRef}
                    placeholder="Password"
                    type="password"
                />
                <button className="btn btn-block">Login</button>
                <p className="message">
                    Not registered? <Link to="/signup">Create an account</Link>
                </p>
            </form>
        </div>
    );
}
