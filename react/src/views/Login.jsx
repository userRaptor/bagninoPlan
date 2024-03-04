import React from "react";
import { Link } from "react-router-dom";


export default function Login() {
    const onSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h1 className="title">Login into your account</h1>
                <input placeholder="Email" type="email" />
                <input placeholder="Password" type="password" />
                <button className="btn btn-block">Login</button>
                <p className="message">
                    Not registered? <Link to="/signup">Create an account</Link>
                </p>
            </form>
        </div>
    );
}
