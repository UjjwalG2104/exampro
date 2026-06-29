import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getExams, getResults, clearAuthData } from "../../api/api";
import "./StudentDashboard.css";

function StudentDashboard() {

    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const studentId = localStorage.getItem("studentId");

    const [stats, setStats] = useState({
        availableExams: 0,
        myResults: 0,
        passCount: 0,
        failCount: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const [examsRes, resultsRes] = await Promise.all([
                getExams(),
                getResults()
            ]);

            const activeExams = examsRes.data.filter(
                e => e.examStatus === "ACTIVE"
            ).length;

            const myResults = resultsRes.data.filter(
                r => String(r.session?.student?.studentId) === String(studentId)
            );

            setStats({
                availableExams: activeExams,
                myResults: myResults.length,
                passCount: myResults.filter(r => r.resultStatus === "PASS").length,
                failCount: myResults.filter(r => r.resultStatus === "FAIL").length
            });

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        clearAuthData();
        navigate("/login");
    };

    return (
        <div className="student-dashboard">

            {/* Sidebar */}
            <aside className="student-sidebar">
                <h2>Student Panel</h2>
                <ul>
                    <li><Link to="/student/dashboard">🏠 Dashboard</Link></li>
                    <li><Link to="/student/exams">📝 Available Exams</Link></li>
                    <li><Link to="/student/results">📊 My Results</Link></li>
                    <li><Link to="/student/profile">👤 Profile</Link></li>
                    <li>
                        <button onClick={handleLogout} className="logout-btn">
                            🚪 Logout
                        </button>
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="student-content">

                <h1>Welcome, {username} 👋</h1>
                <p style={{ color: "#666" }}>SecureAI ExamPro Student Dashboard</p>

                {loading ? (
                    <p style={{ marginTop: "30px" }}>Loading...</p>
                ) : (
                    <div className="student-cards">

                        <Link to="/student/exams" className="student-card">
                            <div style={{ fontSize: "30px" }}>📝</div>
                            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#003366" }}>
                                {stats.availableExams}
                            </div>
                            <div>Available Exams</div>
                        </Link>

                        <Link to="/student/results" className="student-card">
                            <div style={{ fontSize: "30px" }}>📊</div>
                            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#003366" }}>
                                {stats.myResults}
                            </div>
                            <div>My Results</div>
                        </Link>

                        <Link to="/student/results" className="student-card">
                            <div style={{ fontSize: "30px" }}>🏆</div>
                            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#1a7a16" }}>
                                {stats.passCount}
                            </div>
                            <div>Passed</div>
                        </Link>

                        <Link to="/student/results" className="student-card">
                            <div style={{ fontSize: "30px" }}>❌</div>
                            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#cc0000" }}>
                                {stats.failCount}
                            </div>
                            <div>Failed</div>
                        </Link>

                        <Link to="/student/profile" className="student-card">
                            <div style={{ fontSize: "30px" }}>👤</div>
                            <div style={{ fontSize: "28px", fontWeight: "bold", color: "#660066" }}>
                                →
                            </div>
                            <div>My Profile</div>
                        </Link>

                    </div>
                )}
            </main>

        </div>
    );
}

export default StudentDashboard;