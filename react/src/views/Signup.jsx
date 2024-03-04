import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
    const onSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h1 className="title">Signup</h1>
                <input placeholder="Full Name" type="text" />
                <input placeholder="Email" type="Email address" />
                <input placeholder="Password" type="password" />
                <input placeholder="Password Confirmation" type="password" />
                <button className="btn btn-block">Signup</button>
                <p className="message">
                    Already registered? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}
