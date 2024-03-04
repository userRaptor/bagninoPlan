import React, { useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const {setUser, setToken} = useStateContext();

    const onSubmit = (event) => {
        event.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };

        console.log(payload);

        axiosClient.post('/signup', payload)
            .then((data) => {
                setToken(data.token);
                setUser(data.user);
            })
            .catch((error) => {
                const response = error.response;
                if (response && response.status == 422) {
                    console.log(response.data.errors);
                }
            });


    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h1 className="title">Signup</h1>
                <input ref={nameRef} placeholder="Full Name" type="text" />
                <input
                    ref={emailRef}
                    placeholder="Email address"
                    type="email"
                />
                <input
                    ref={passwordRef}
                    placeholder="Password"
                    type="password"
                />
                <input
                    ref={passwordConfirmationRef}
                    placeholder="Password Confirmation"
                    type="password"
                />
                <button className="btn btn-block">Signup</button>
                <p className="message">
                    Already registered? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}
