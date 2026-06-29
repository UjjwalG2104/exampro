import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, getStudents, getExams, getResults, clearAuthData } from "../../api/api";
import "./AdminDashboard.css";

function AdminDashboard() {

    const navigate = useNavigate();
    const username = localStorage.getItem("username");

    const [stats, setStats] = useState({
        users: 0, students: 0, exams: 0, results: 0,
        passCount: 0, failCount: 0, activeSessions: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const [usersRes, studentsRes, examsRes, resultsRes] = await Promise.all([
                getUsers(), getStudents(), getExams(), getResults()
            ]);

            const results = resultsRes.data;
            const passCount = results.filter(r => r.resultStatus === "PASS").length;
            const failCount = results.filter(r => r.resultStatus === "FAIL").length;
            const activeExams = examsRes.data.filter(e => e.examStatus === "ACTIVE").length;

            setStats({
                users: usersRes.data.length,
                students: studentsRes.data.length,
                exams: examsRes.data.length,
                results: results.length,
                passCount,
                failCount,
                activeExams
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

    const statCards = [
        { icon: "👥", label: "Total Users",    value: stats.users,      color: "#003366" },
        { icon: "🎓", label: "Students",       value: stats.students,   color: "#006600" },
        { icon: "📝", label: "Total Exams",    value: stats.exams,      color: "#660066" },
        { icon: "✅", label: "Active Exams",   value: stats.activeExams,color: "#cc6600" },
        { icon: "📈", label: "Total Results",  value: stats.results,    color: "#004466" },
        { icon: "🏆", label: "Passed",         value: stats.passCount,  color: "#1a7a16" },
        { icon: "❌", label: "Failed",         value: stats.failCount,  color: "#cc0000" },
    ];

    return (
        <div className="dashboard">

            {/* Sidebar */}
            <aside className="sidebar">
                <h2>ExamPro</h2>
                <ul>
                    <li><Link to="/admin/dashboard">📊 Dashboard</Link></li>
                    <li><Link to="/admin/users">👥 Users</Link></li>
                    <li><Link to="/admin/departments">🏫 Departments</Link></li>
                    <li><Link to="/admin/courses">📚 Courses</Link></li>
                    <li><Link to="/admin/faculties">👨‍🏫 Faculty</Link></li>
                    <li><Link to="/admin/students">🎓 Students</Link></li>
                    <li><Link to="/admin/exams">📝 Exams</Link></li>
                    <li><Link to="/admin/questions">❓ Questions</Link></li>
                    <li><Link to="/admin/options">🎯 MCQ Options</Link></li>
                    <li><Link to="/admin/exam-questions">📋 Exam Questions</Link></li>
                    <li><Link to="/admin/exam-sessions">🧑‍💻 Exam Sessions</Link></li>
                    <li><Link to="/admin/student-answers">📝 Student Answers</Link></li>
                    <li><Link to="/admin/results">📈 Results</Link></li>
                    <li><Link to="/admin/notifications">🔔 Notifications</Link></li>
                    <li><Link to="/admin/security-logs">🔐 Security Logs</Link></li>
                    <li><Link to="/admin/audit-logs">📋 Audit Logs</Link></li>
                    <li><Link to="/admin/webcam-logs">🎥 Webcam Logs</Link></li>
                    <li><button onClick={handleLogout} className="logout-btn">🚪 Logout</button></li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="content">

                <h1>Welcome, {username} 👋</h1>
                <p style={{ color: "#666", marginTop: "5px" }}>SecureAI ExamPro Admin Dashboard</p>

                {loading ? (
                    <p style={{ marginTop: "30px" }}>Loading stats...</p>
                ) : (
                    <>
                        <div className="cards" style={{ flexWrap: "wrap" }}>
                            {statCards.map((card, i) => (
                                <div key={i} className="card" style={{ borderTop: `4px solid ${card.color}` }}>
                                    <div style={{ fontSize: "30px" }}>{card.icon}</div>
                                    <div style={{ fontSize: "28px", fontWeight: "bold", color: card.color }}>
                                        {card.value}
                                    </div>
                                    <div style={{ fontSize: "13px", color: "#555" }}>{card.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Pass/Fail ratio bar */}
                        {stats.results > 0 && (
                            <div style={{ marginTop: "30px", maxWidth: "500px" }}>
                                <h3 style={{ color: "#003366", marginBottom: "10px" }}>📊 Pass/Fail Ratio</h3>
                                <div style={{ display: "flex", height: "20px", borderRadius: "10px", overflow: "hidden" }}>
                                    <div style={{
                                        width: `${(stats.passCount / stats.results) * 100}%`,
                                        background: "#1a7a16"
                                    }} />
                                    <div style={{
                                        width: `${(stats.failCount / stats.results) * 100}%`,
                                        background: "#cc0000"
                                    }} />
                                </div>
                                <div style={{ display: "flex", gap: "20px", marginTop: "8px", fontSize: "13px" }}>
                                    <span>🟢 Pass: {((stats.passCount / stats.results) * 100).toFixed(1)}%</span>
                                    <span>🔴 Fail: {((stats.failCount / stats.results) * 100).toFixed(1)}%</span>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

export default AdminDashboard;