import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axiosClient from "../axios-client";

export default function UserForm() {
    let { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const navigate = useNavigate();

    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(user);

        if (user.id) {
            axiosClient
                .put(`/users/${user.id}`, user)
                .then(() => {
                    navigate("/users");
                })
                .catch((error) => {
                    const response = error.response;
                    if (response && response.status === 422) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors);
                    }
                });
        } else {
            const payload = {
                name: user.name,
                email: user.email,
                password: user.password,
                password_confirmation: user.confirmPassword,
            };

            axiosClient
                .post("/users", payload)
                .then(() => {
                    addUserSuccNotification();
                    navigate("/users");
                })
                .catch((error) => {
                    const response = error.response;
                    if (response && response.status === 422) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    const addUserSuccNotification = () => {
        toast.success("The user was added successfully!", {
            position: "bottom-right",
        });
    };

    return (
        <div>
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>Create User</h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            placeholder="Full Name"
                            type="text"
                            value={user.name}
                            onChange={(event) =>
                                setUser({ ...user, name: event.target.value })
                            }
                        />
                        <input
                            placeholder="Email address"
                            type="email"
                            value={user.email}
                            onChange={(event) =>
                                setUser({ ...user, email: event.target.value })
                            }
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            value={user.password}
                            onChange={(event) =>
                                setUser({
                                    ...user,
                                    password: event.target.value,
                                })
                            }
                        />
                        <input
                            placeholder="Confirm Password"
                            type="password"
                            value={user.confirmPassword}
                            onChange={(event) =>
                                setUser({
                                    ...user,
                                    confirmPassword: event.target.value,
                                })
                            }
                        />
                        <button className="btn" type="submit">
                            Save
                        </button>
                    </form>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}
