import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearAuthData } from "../../api/api";
import "./FacultyDashboard.css";


function FacultyDashboard() {

    const navigate = useNavigate();

    const username = localStorage.getItem("username");


    const handleLogout = () => {
        clearAuthData();
        navigate("/login");
    };


    return (

        <div className="faculty-dashboard">


            {/* Sidebar */}
            <aside className="faculty-sidebar">

                <h2>Faculty Panel</h2>


                <ul>

                    <li>
                        <Link to="/faculty/dashboard">
                            📊 Dashboard
                        </Link>
                    </li>


                    <li>
                        <Link to="/faculty/exams">
                            📝 My Exams
                        </Link>
                    </li>


                    <li>
                        <Link to="/faculty/questions">
                            ❓ Questions
                        </Link>
                    </li>


                    <li>
                        <Link to="/faculty/options">
                            🎯 MCQ Options
                        </Link>
                    </li>


                    <li>
                        <Link to="/faculty/exam-sessions">
                            🧑‍💻 Exam Sessions
                        </Link>
                    </li>


                    <li>
                        <Link to="/faculty/results">
                            📈 Student Results
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
            <main className="faculty-content">


                <h1>
                    Welcome, {username}
                </h1>


                <p>
                    Manage your exams and monitor student performance.
                </p>


                {/* Faculty Cards */}
                <div className="faculty-cards">


                    <Link
                        to="/faculty/exams"
                        className="faculty-card"
                    >
                        📝
                        <br />
                        My Exams
                    </Link>


                    <Link
                        to="/faculty/questions"
                        className="faculty-card"
                    >
                        ❓
                        <br />
                        Questions
                    </Link>


                    <Link
                        to="/faculty/options"
                        className="faculty-card"
                    >
                        🎯
                        <br />
                        MCQ Options
                    </Link>


                    <Link
                        to="/faculty/exam-sessions"
                        className="faculty-card"
                    >
                        🧑‍💻
                        <br />
                        Sessions
                    </Link>


                    <Link
                        to="/faculty/results"
                        className="faculty-card"
                    >
                        📊
                        <br />
                        Results
                    </Link>


                </div>


            </main>


        </div>

    );

}


export default FacultyDashboard;