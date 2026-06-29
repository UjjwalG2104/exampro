import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getExams, getResults, getFacultyByUsername, clearAuthData } from "../../api/api";
import "./FacultyDashboard.css";

function FacultyDashboard() {

    const navigate = useNavigate();
    const username = localStorage.getItem("username");

    const [stats, setStats] = useState({
        myExams: 0, activeExams: 0, totalResults: 0, passCount: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const facultyRes = await getFacultyByUsername(username);
            const fId = facultyRes.data.facultyId;

            const [examsRes, resultsRes] = await Promise.all([
                getExams(), getResults()
            ]);

            const myExams = examsRes.data.filter(
                e => e.faculty?.facultyId === fId
            );
            const activeExams = myExams.filter(
                e => e.examStatus === "ACTIVE"
            ).length;

            const myExamIds = myExams.map(e => e.examId);
            const myResults = resultsRes.data.filter(
                r => myExamIds.includes(r.session?.exam?.examId)
            );
            const passCount = myResults.filter(
                r => r.resultStatus === "PASS"
            ).length;

            setStats({
                myExams: myExams.length,
                activeExams,
                totalResults: myResults.length,
                passCount
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
        <div className="faculty-dashboard">

            {/* Sidebar */}
            <aside className="faculty-sidebar">
                <h2>Faculty Panel</h2>
                <ul>
                    <li><Link to="/faculty/dashboard">📊 Dashboard</Link></li>
                    <li><Link to="/faculty/exams">📝 My Exams</Link></li>
                    <li><Link to="/faculty/questions">❓ Questions</Link></li>
                    <li><Link to="/faculty/options">🎯 MCQ Options</Link></li>
                    <li><Link to="/faculty/exam-sessions">🧑‍💻 Exam Sessions</Link></li>
                    <li><Link to="/faculty/results">📈 Student Results</Link></li>
                    <li>
                        <button onClick={handleLogout} className="logout-btn">
                            🚪 Logout
                        </button>
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="faculty-content">

                <h1>Welcome, {username} 👋</h1>
                <p style={{ color: "#666" }}>Manage your exams and monitor student performance.</p>

                {loading ? (
                    <p style={{ marginTop: "30px" }}>Loading...</p>
                ) : (
                    <div className="faculty-cards">

                        <Link to="/faculty/exams" className="faculty-card">
                            <div style={{ fontSize: "28px" }}>📝</div>
                            <div style={{ fontSize: "26px", fontWeight: "bold", color: "#003366" }}>
                                {stats.myExams}
                            </div>
                            <div>My Exams</div>
                        </Link>

                        <Link to="/faculty/exams" className="faculty-card">
                            <div style={{ fontSize: "28px" }}>✅</div>
                            <div style={{ fontSize: "26px", fontWeight: "bold", color: "#cc6600" }}>
                                {stats.activeExams}
                            </div>
                            <div>Active Exams</div>
                        </Link>

                        <Link to="/faculty/results" className="faculty-card">
                            <div style={{ fontSize: "28px" }}>📊</div>
                            <div style={{ fontSize: "26px", fontWeight: "bold", color: "#004466" }}>
                                {stats.totalResults}
                            </div>
                            <div>Total Results</div>
                        </Link>

                        <Link to="/faculty/results" className="faculty-card">
                            <div style={{ fontSize: "28px" }}>🏆</div>
                            <div style={{ fontSize: "26px", fontWeight: "bold", color: "#1a7a16" }}>
                                {stats.passCount}
                            </div>
                            <div>Students Passed</div>
                        </Link>

                        <Link to="/faculty/questions" className="faculty-card">
                            <div style={{ fontSize: "28px" }}>❓</div>
                            <div style={{ fontSize: "26px", fontWeight: "bold", color: "#660066" }}>→</div>
                            <div>Questions</div>
                        </Link>

                    </div>
                )}

            </main>

        </div>
    );
}

export default FacultyDashboard;