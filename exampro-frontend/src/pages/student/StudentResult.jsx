import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import "./StudentResult.css";

function StudentResult() {

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadResults();
    }, []);

    const loadResults = async () => {
        try {
            const studentId = localStorage.getItem("studentId");

            if (!studentId) {
                alert("Student ID not found. Please login again.");
                navigate("/login");
                return;
            }

            const response = await API.get(`/results/student/${studentId}`);
            setResults(response.data);

        } catch (error) {
            console.error(error);
            alert("Failed to load results.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <h2 style={{ padding: "30px" }}>Loading Results...</h2>;

    return (
        <div className="student-result">

            <h1>📊 My Results</h1>

            {results.length === 0 ? (
                <p>No results yet. Complete an exam to see your results here.</p>
            ) : (
                results.map((result) => (
                    <div key={result.resultId} className="result-card">

                        <h3>{result.session?.exam?.examTitle}</h3>

                        <p>📚 Course: {result.session?.exam?.course?.courseName || "N/A"}</p>

                        <p>🎯 Score: <strong>{result.obtainedMarks} / {result.totalMarks}</strong></p>

                        <p>📈 Percentage: <strong>{result.percentage?.toFixed(2)}%</strong></p>

                        <p>Status: {" "}
                            <span className={result.resultStatus === "PASS" ? "status-pass" : "status-fail"}>
                                {result.resultStatus === "PASS" ? "✅ PASS" : "❌ FAIL"}
                            </span>
                        </p>

                        <p style={{ fontSize: "12px", color: "#999" }}>
                            📅 {result.publishedAt
                                ? new Date(result.publishedAt).toLocaleString()
                                : "N/A"}
                        </p>

                    </div>
                ))
            )}

        </div>
    );
}

export default StudentResult;