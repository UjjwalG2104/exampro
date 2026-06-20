import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

function StudentDashboard() {

    const navigate = useNavigate();

    const username = localStorage.getItem("username");


    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");

        alert("Logged out successfully");

        navigate("/login");
    };


    return (

        <div className="student-dashboard">


            {/* Sidebar */}
            <aside className="student-sidebar">

                <h2>Student Panel</h2>


                <ul>

                    <li>
                        <Link to="/student/dashboard">
                            🏠 Dashboard
                        </Link>
                    </li>


                    <li>
                        <Link to="/student/exams">
                            📝 Available Exams
                        </Link>
                    </li>


                    <li>
                        <Link to="/student/results">
                            📊 My Results
                        </Link>
                    </li>


                    <li>
                        <Link to="/student/profile">
                            👤 Profile
                        </Link>
                    </li>


                    <li>
                        <button
                            onClick={handleLogout}
                            className="logout-btn"
                        >
                            🚪 Logout
                        </button>
                    </li>

                </ul>

            </aside>


            {/* Main Content */}
            <main className="student-content">

                <h1>
                    Welcome, {username}
                </h1>


                <p>
                    SecureAI ExamPro Student Dashboard
                </p>


                <div className="student-cards">

                    <div className="student-card">
                        📝 Take Exam
                    </div>


                    <div className="student-card">
                        📊 View Results
                    </div>


                    <div className="student-card">
                        👤 Profile
                    </div>

                </div>

            </main>

        </div>

    );
}

export default StudentDashboard;