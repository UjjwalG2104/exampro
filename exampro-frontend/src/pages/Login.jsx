import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { setAuthData } from "../api/api";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");


    // Handle input changes
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    // Handle login
    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {

            const response = await API.post(
                "/auth/login",
                formData
            );


            // Save token, role, username
            setAuthData(response.data);


            setMessage("Login successful!");


            const role = response.data.role;


            // Redirect based on role
            setTimeout(() => {

                if (role === "ADMIN") {

                    navigate("/admin/dashboard");

                }
                else if (role === "FACULTY") {

                    navigate("/faculty/dashboard");

                }
                else if (role === "STUDENT") {

                    navigate("/student/dashboard");

                }
                else {

                    navigate("/login");

                }

            }, 1000);


        } catch (error) {

            console.error(error);


            if (error.response) {

                setMessage(
                    error.response.data.message ||
                    "Invalid username or password"
                );

            } else {

                setMessage(
                    "Server connection failed. Please try again."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="login-container">


            <div className="login-card">


                <h1>
                    SecureAI ExamPro
                </h1>


                <p>
                    AI-Based Online Examination System
                </p>


                <form onSubmit={handleSubmit}>


                    <div className="input-group">


                        <label>
                            Username
                        </label>


                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            placeholder="Enter username"
                            onChange={handleChange}
                            required
                        />


                    </div>


                    <div className="input-group">


                        <label>
                            Password
                        </label>


                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            placeholder="Enter password"
                            onChange={handleChange}
                            required
                        />


                    </div>


                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Logging in..."
                                : "Login"
                        }

                    </button>


                    {
                        message &&

                        <div className="message">

                            {message}

                        </div>

                    }


                </form>


            </div>


        </div>

    );

}


export default Login;