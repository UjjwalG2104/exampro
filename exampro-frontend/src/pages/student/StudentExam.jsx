import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExams, createExamSession } from "../../api/api";
import "./StudentExam.css";

function StudentExam() {

    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadExams();
    }, []);

    const loadExams = async () => {
        try {
            const response = await getExams();
            // Show only ACTIVE exams to students
            setExams(response.data.filter(e => e.examStatus === "ACTIVE"));
        } catch (error) {
            console.error(error);
            alert("Failed to load exams.");
        } finally {
            setLoading(false);
        }
    };

    const startExam = async (examId) => {
        try {
            const studentId = localStorage.getItem("studentId");

            if (!studentId) {
                alert("Student ID not found. Please login again.");
                return;
            }

            const response = await createExamSession({
                exam: { examId: examId },
                student: { studentId: Number(studentId) }
            });

            localStorage.setItem("sessionId", response.data.sessionId);
            navigate("/student/exam-page/" + examId);

        } catch (error) {
            console.error(error);
            alert("Failed to start exam. You may have already attempted this exam.");
        }
    };

    if (loading) return <h2 style={{ padding: "30px" }}>Loading Exams...</h2>;

    return (
        <div className="student-exams">

            <h1>📝 Available Exams</h1>
            <p>Total: {exams.length} exam(s)</p>

            <div className="exam-list">
                {exams.length === 0 ? (
                    <p>No active exams available right now.</p>
                ) : (
                    exams.map((exam) => (
                        <div key={exam.examId} className="exam-card">

                            <h3>{exam.examTitle}</h3>
                            <p>📚 {exam.course?.courseName}</p>
                            <p>⏱ Duration: {exam.durationMinutes} minutes</p>
                            <p>🎯 Total Marks: {exam.totalMarks}</p>

                            <button onClick={() => startExam(exam.examId)}>
                                🚀 Start Exam
                            </button>

                        </div>
                    ))
                )}
            </div>

        </div>
    );
}

export default StudentExam;