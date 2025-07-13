// src/components/Login.jsx

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Container, Toast } from "react-bootstrap";
// import LoginForm from "./testform";
// import LoginForms from "./chatgpt";
import Form from 'react-bootstrap/Form';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./AuthCard.css";


const Login = () => {
    // const [loginDetails, setLoginDetails] = useState({email: "",password: ""});
    const [loginDetails, setLoginDetails] = useState(() => {
        const storedDetails = localStorage.getItem("loginDetails");
        const parsed = storedDetails ? JSON.parse(storedDetails) : {};
        return {
            username: parsed.username || "",
            email: parsed.email || "",
            password: parsed.password || ""
        };
        // return storedDetails ? JSON.parse(storedDetails) : {}
    });
    const [errors, setErrors] = useState({});
    const [isFlipped, setIsFlipped] = useState(false);
    const [mode, setMode] = useState("login");

    const toggleFlip = () => { setIsFlipped(!isFlipped); setMode(isFlipped ? "register" : "login"); };

    useEffect(() => {
        localStorage.setItem("loginDetails", JSON.stringify(loginDetails));
        setErrors({});
    }, [loginDetails, mode]);
    // useEffect(() => {
    //     setErrors({});
    //   }, [mode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails((loginDetails) => ({
            ...loginDetails,
            [name]: value
        }));

        // setLoginDetails({...loginDetails,[name]: value});
    };
    const validate = (mode) => {
        const validateEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };
        let tempErrors = {};
        if (mode === "register") {
            if (!validateEmail(loginDetails.email)) {
                tempErrors.email = "Invalid email address";
            };
            if (loginDetails.password.length < 5) {
                tempErrors.password = "Password must be at least 5 characters long";
            };
            if (loginDetails.username.length < 5 || loginDetails.username === undefined) {
                tempErrors.username = "username must be at least 5 characters long";
            };

            if (!loginDetails.username) tempErrors.username = "username is required";
            if (!loginDetails.email) tempErrors.email = "Email is required";
            if (!loginDetails.password) tempErrors.password = "Password is required";
            setErrors(tempErrors);
            console.log(Object.keys(tempErrors));
            return Object.keys(tempErrors).length === 0;
        } else if (mode === "login") {
            if (!validateEmail(loginDetails.email)) {
                tempErrors.email = "Invalid email address";
            };
            if (loginDetails.password.length < 5) {
                tempErrors.password = "Password must be at least 5 characters long";
            };
            if (!loginDetails.email) tempErrors.email = "Email is required";
            if (!loginDetails.password) tempErrors.password = "Password is required";
            setErrors(tempErrors);
            console.log(Object.keys(tempErrors));
            return Object.keys(tempErrors).length === 0;
        }

    };
    const handleRegister = async (e) => {
        e.preventDefault();
        if (validate("register")) {
            const toastId = toast.warning("Checking your register details Please wait.....", { autoClose: false });

            try {
                const response = await axios.post('http://localhost:5000/api/auth/register', {
                    username: loginDetails.username,
                    email: loginDetails.email,
                    password: loginDetails.password
                });
                console.log("data", response.data);
                console.log(response.status);
                console.log(response.statusText);
                toast.update(toastId, {
                    type: 'success',
                    render: 'Register Successfull!',
                    autoClose: 5000,
                    isLoading: false
                })
                setLoginDetails({ username: '', email: '', password: '' });
                localStorage.removeItem('loginDetails');
            }
            catch (error) {
                console.log("Error", error);
                if (error.response && error.response.data.error) {
                    setErrors(error.response.data.error);
                    toast.update(toastId, {
                        type: 'error',
                        render: 'Login Failed ' + error.response.data.error,
                        autoClose: 5000,
                        isLoading: false
                    })
                } else {
                    setErrors({ general: "Something went wrong. Please try again." });
                }
            }
        } else {
            console.log("Validation failed");
            // setErrors({ general: "Something went wrong" });
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (validate("login")) {
            const toastId = toast.warning("Checking your Login Credintials Please wait.....", { autoClose: false });
            try {
                const baseUrl = "http://localhost:5000/api";
                const response = await axios.post(baseUrl + "/auth/login", {
                    email: loginDetails.email,
                    password: loginDetails.password,
                });
                console.log("response", response);
                // toast.dismiss(toastId);
                // toast.success("Login successful!");
                toast.update(toastId, {
                    type: 'success',
                    render: 'Login Successfull!',
                    autoClose: 5000,
                    isLoading: false
                })
                setLoginDetails({ email: '', password: '' });
                localStorage.removeItem('loginDetails');
                localStorage.setItem("token", response.data.token);
            } catch (error) {
                // toast.dismiss(toastId);
                // toast.error("Login Failed " + error.message);
                // Display error message from API
                if (error.response && error.response.data.error) {
                    setErrors(error.response.data.error);
                    toast.update(toastId, {
                        type: 'error',
                        render: 'Login Failed ' + error.response.data.error,
                        autoClose: 5000,
                        isLoading: false
                    })
                } else {
                    setErrors({ general: "Something went wrong. Please try again." });
                }
            }
        } else {
            console.log("Form not submitted");
            console.log(validate("login"));
        }
    };
    return (
        <>
            <Helmet>
                <title>Login Page</title>
            </Helmet>

            <Container>
                {/* <LoginForm />
                <LoginForms /> */}
                <div className="d-flex justify-content-center align-items-center vh-100 mt-3">
                    <div className={`auth-card ${isFlipped ? "flipped" : ""}`}>
                        {/* Front: Login Form */}
                        <div className="auth-card-inner">
                            {!isFlipped ? (
                                <div className="auth-card-front card shadow p-4">
                                    <h3 className="text-center mb-4">Login</h3>
                                    <form onSubmit={(e) => handleLogin(e)} noValidate>
                                        <div className="mb-3">
                                            <input type="email" name="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} onChange={handleChange} value={loginDetails.email || ""} id="email" aria-describedby="emailHelp" placeholder="Email" />
                                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                        </div>
                                        <div className="mb-3">
                                            <input type="password" name="password" placeholder="Password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} onChange={handleChange} value={loginDetails.password || ""} id="password" />
                                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                        </div>
                                        <button type="submit" id="login" className="btn btn-primary w-100 mb-2">Login</button>
                                        <p className="text-center">
                                            Don't have an account? <button type="button" onClick={toggleFlip} className="btn btn-link">Sign Up</button>
                                        </p>
                                    </form>
                                </div>
                                ) : (
                                <div className="auth-card-back card shadow p-4">
                                    <h3 className="text-center mb-4">Register</h3>
                                    <form onSubmit={(e) => handleRegister(e)} noValidate>
                                        <div className="mb-3">
                                            <input type="text" className="form-control" value={loginDetails.username || ""} onChange={handleChange} name="username" id="registerusername" placeholder="userName" />
                                            {errors.username && <div className="invalid-feedback">{errors.username}</div>}

                                        </div>
                                        <div className="mb-3">
                                            <input type="email" value={loginDetails.email || ""} onChange={handleChange} className="form-control" name="email" id="registeremail" placeholder="Email" />
                                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}

                                        </div>
                                        <div className="mb-3">
                                            <input type="password" className="form-control" name="password" id="registerpassword" value={loginDetails.password || ""} onChange={handleChange} placeholder="Password" />
                                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                        </div>
                                        <button type="submit" id="register" className="btn btn-success w-100 mb-2">Register</button>
                                        <p className="text-center">
                                            Already have an account? <button type="button" onClick={toggleFlip} className="btn btn-link">Login</button>
                                        </p>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <ToastContainer />
            </Container >
        </>
    );
};

export default Login;
