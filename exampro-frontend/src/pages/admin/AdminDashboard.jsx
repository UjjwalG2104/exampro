import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";


function AdminDashboard() {

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

        <div className="dashboard">


            {/* Sidebar */}
            <aside className="sidebar">

                <h2>ExamPro</h2>


                <ul>

                    <li>
                        <Link to="/admin/dashboard">
                            📊 Dashboard
                        </Link>
                    </li>


                    <li>
                        <Link to="/admin/users">
                            👥 Users
                        </Link>
                    </li>


                    <li>
                        <Link to="/admin/departments">
                            🏫 Departments
                        </Link>
                    </li>


                    <li>
                        <Link to="/admin/courses">
                            📚 Courses
                        </Link>
                    </li>


                    <li>
                        <Link to="/admin/faculties">
                            👨‍🏫 Faculty
                        </Link>
                    </li>


                    <li>
                        <Link to="/admin/students">
                            🎓 Students
                        </Link>
                    </li>


                    <li>
                        <Link to="/admin/exams">
                            📝 Exams
                        </Link>
                    </li>


                    <li>
                        <Link to="/admin/questions">
                            ❓ Questions
                        </Link>
                    </li>


                    <li>
                        <Link to="/admin/options">
                            🎯 MCQ Options
                        </Link>
                    </li>


                    <li>
                        <Link to="/admin/exam-questions">
                            🎯 Exam Questions
                        </Link>
                    </li>


                    <li>
                        <Link to="/admin/exam-sessions">
                            🧑‍💻 Exam Sessions
                        </Link>
                    </li>


                    <li>
                        <Link to="/admin/student-answers">
                            📝 Student Answers
                        </Link>
                    </li>


                    <li>
                        <Link to="/admin/results">
                            📈 Results
                        </Link>
                    </li>


                    <li>
                        <Link to="/admin/notifications">
                            🔔 Notifications
                        </Link>
                    </li>


                    <li>
                        <Link to="/admin/security-logs">
                            🔐 Security Logs
                        </Link>
                    </li>


                    <li>
                        <Link to="/admin/audit-logs">
                            📋 Audit Logs
                        </Link>
                    </li>


                    <li>
                        <Link to="/admin/webcam-logs">
                            🎥 Webcam Logs
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
            <main className="content">


                <h1>
                    Welcome, {username}
                </h1>


                <p>
                    SecureAI ExamPro Admin Dashboard
                </p>


                {/* Dashboard Cards */}
                <div className="cards">


                    <div className="card">
                        👥 Users
                    </div>


                    <div className="card">
                        🎓 Students
                    </div>


                    <div className="card">
                        📝 Exams
                    </div>


                    <div className="card">
                        📈 Results
                    </div>


                </div>


            </main>


        </div>

    );

}


export default AdminDashboard;