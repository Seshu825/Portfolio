// src/components/Login.jsx

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Logintest = () => {
    const [loginDetails, setLoginDetails] = useState(() => {
        const storedDetails = localStorage.getItem("loginDetails");
        const parsed = storedDetails ? JSON.parse(storedDetails) : {};
        return {
            identifier: parsed.identifier || "",
            username: parsed.username || "",
            email: parsed.email || "",
            password: parsed.password || ""
        };
    });

    const [errors, setErrors] = useState({});
    const [isFlipped, setIsFlipped] = useState(false);
    const [mode, setMode] = useState("login");

    const toggleFlip = () => {
        setIsFlipped(!isFlipped);
        setMode(isFlipped ? "login" : "register");
    };

    useEffect(() => {
        localStorage.setItem("loginDetails", JSON.stringify(loginDetails));
    }, [loginDetails]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const validate = (mode) => {
        const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const validateUsername = (username) => username.length >= 5;
        let tempErrors = {};

        if (mode === "login") {
            if (!loginDetails.identifier) {
                tempErrors.identifier = "Email or username is required";
            } else if (
                !validateEmail(loginDetails.identifier) &&
                !validateUsername(loginDetails.identifier)
            ) {
                tempErrors.identifier = "Enter a valid email or username (min 5 characters)";
            }
        }

        if (mode === "register") {
            if (!loginDetails.username) {
                tempErrors.username = "Username is required";
            } else if (!validateUsername(loginDetails.username)) {
                tempErrors.username = "Username must be at least 5 characters long";
            }

            if (!loginDetails.email) {
                tempErrors.email = "Email is required";
            } else if (!validateEmail(loginDetails.email)) {
                tempErrors.email = "Invalid email address";
            }
        }

        if (!loginDetails.password) {
            tempErrors.password = "Password is required";
        } else if (loginDetails.password.length < 5) {
            tempErrors.password = "Password must be at least 5 characters long";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (validate("login")) {
            const toastId = toast.warning("Checking your Login Credentials...", { autoClose: false });
            try {
                const response = await axios.post("http://localhost:5000/api/auth/login", {
                    identifier: loginDetails.identifier,
                    password: loginDetails.password,
                });
                toast.update(toastId, {
                    type: 'success',
                    render: 'Login Successful!',
                    autoClose: 5000,
                    isLoading: false
                });
                localStorage.setItem("token", response.data.token);
                setLoginDetails({ identifier: '', username: '', email: '', password: '' });
                localStorage.removeItem("loginDetails");
            } catch (error) {
                const errorMsg = error.response?.data?.error || "Something went wrong. Please try again.";
                toast.update(toastId, {
                    type: 'error',
                    render: `Login Failed: ${errorMsg}`,
                    autoClose: 5000,
                    isLoading: false
                });
            }
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (validate("register")) {
            const toastId = toast.warning("Checking your register details...", { autoClose: false });
            try {
                const response = await axios.post("http://localhost:5000/api/auth/register", {
                    username: loginDetails.username,
                    email: loginDetails.email,
                    password: loginDetails.password,
                });
                toast.update(toastId, {
                    type: 'success',
                    render: 'Registration Successful!',
                    autoClose: 5000,
                    isLoading: false
                });
                setLoginDetails({ identifier: '', username: '', email: '', password: '' });
                localStorage.removeItem("loginDetails");
            } catch (error) {
                const errorMsg = error.response?.data?.error || "Something went wrong. Please try again.";
                toast.update(toastId, {
                    type: 'error',
                    render: `Register Failed: ${errorMsg}`,
                    autoClose: 5000,
                    isLoading: false
                });
            }
        }
    };

    return (
        <>
            <Helmet><title>Login Page</title></Helmet>
            <Container>
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className={`auth-card ${isFlipped ? "flipped" : ""}`}>
                        <div className="auth-card-inner">
                            {/* Login Form */}
                            <div className="auth-card-front card shadow p-4">
                                <h3 className="text-center mb-4">Login</h3>
                                <form onSubmit={handleLogin} noValidate>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            name="identifier"
                                            className={`form-control ${errors.identifier ? 'is-invalid' : ''}`}
                                            onChange={handleChange}
                                            value={loginDetails.identifier || ""}
                                            placeholder="Email or Username"
                                        />
                                        {errors.identifier && <div className="invalid-feedback">{errors.identifier}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            name="password"
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            onChange={handleChange}
                                            value={loginDetails.password || ""}
                                            placeholder="Password"
                                        />
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100 mb-2">Login</button>
                                    <p className="text-center">
                                        Don't have an account? <button type="button" onClick={toggleFlip} className="btn btn-link">Sign Up</button>
                                    </p>
                                </form>
                            </div>

                            {/* Register Form */}
                            <div className="auth-card-back card shadow p-4">
                                <h3 className="text-center mb-4">Register</h3>
                                <form onSubmit={handleRegister} noValidate>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            name="username"
                                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                            onChange={handleChange}
                                            value={loginDetails.username || ""}
                                            placeholder="Username"
                                        />
                                        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            name="email"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            onChange={handleChange}
                                            value={loginDetails.email || ""}
                                            placeholder="Email"
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            name="password"
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            onChange={handleChange}
                                            value={loginDetails.password || ""}
                                            placeholder="Password"
                                        />
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    </div>
                                    <button type="submit" className="btn btn-success w-100 mb-2">Register</button>
                                    <p className="text-center">
                                        Already have an account? <button type="button" onClick={toggleFlip} className="btn btn-link">Login</button>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </Container>
        </>
    );
};

export default Logintest;
