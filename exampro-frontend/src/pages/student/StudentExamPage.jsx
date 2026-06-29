import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    getExamQuestionsByExamId,
    getOptionsByQuestionId,
    getExamById,
    createStudentAnswer,
    completeExamSession,
    warnExamSession,
    terminateExamSession
} from "../../api/api";
import "./StudentExam.css";

function StudentExamPage() {

    const { examId } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [optionsMap, setOptionsMap] = useState({});
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [warnings, setWarnings] = useState(0);
    const timerRef = useRef(null);
    const MAX_WARNINGS = 3;

    useEffect(() => {
        loadExam();

        // Tab switch detection
        const handleVisibilityChange = async () => {
            if (document.hidden) {
                const sessionId = localStorage.getItem("sessionId");
                if (!sessionId) return;

                try {
                    const res = await warnExamSession(sessionId);
                    const count = res.data.warningCount;
                    setWarnings(count);

                    if (count >= MAX_WARNINGS) {
                        clearInterval(timerRef.current);
                        alert("⚠️ You have been caught switching tabs 3 times. Your exam has been TERMINATED!");
                        await terminateExamSession(sessionId);
                        navigate("/student/dashboard");
                    } else {
                        alert(`⚠️ Warning ${count}/${MAX_WARNINGS}: Do not switch tabs during the exam!`);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            clearInterval(timerRef.current);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    const loadExam = async () => {
        try {
            // Load exam details for duration
            const examRes = await getExamById(examId);
            const durationSeconds = examRes.data.durationMinutes * 60;
            setTimeLeft(durationSeconds);
            startTimer(durationSeconds);

            // Load questions and options
            const response = await getExamQuestionsByExamId(examId);
            setQuestions(response.data);

            for (const q of response.data) {
                const optRes = await getOptionsByQuestionId(q.question.questionId);
                setOptionsMap(prev => ({
                    ...prev,
                    [q.question.questionId]: optRes.data
                }));
            }

        } catch (error) {
            console.error(error);
            alert("Failed to load exam.");
        } finally {
            setLoading(false);
        }
    };

    const startTimer = (seconds) => {
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    autoSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };

    const getTimerColor = () => {
        if (timeLeft > 300) return "#1a7a16";   // green — more than 5 mins
        if (timeLeft > 60) return "#cc6600";    // orange — less than 5 mins
        return "#cc0000";                        // red — less than 1 min
    };

    const handleAnswerChange = (questionId, optionId) => {
        setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    };

    const submitAnswers = async () => {
        const sessionId = localStorage.getItem("sessionId");
        if (!sessionId) {
            alert("Session not found. Please login again.");
            return;
        }

        for (const [questionId, optionId] of Object.entries(answers)) {
            await createStudentAnswer({
                session: { sessionId: Number(sessionId) },
                question: { questionId: Number(questionId) },
                option: { optionId: Number(optionId) }
            });
        }

        await completeExamSession(sessionId);
    };

    const autoSubmit = async () => {
        try {
            await submitAnswers();
            alert("⏰ Time is up! Exam auto-submitted.");
            navigate("/student/results");
        } catch (error) {
            console.error(error);
        }
    };

    const submitExam = async () => {
        if (!window.confirm("Are you sure you want to submit the exam?")) return;

        setSubmitting(true);
        clearInterval(timerRef.current);
        try {
            await submitAnswers();
            alert("Exam submitted successfully!");
            navigate("/student/results");
        } catch (error) {
            console.error(error);
            alert("Failed to submit. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <h2 style={{ padding: "30px" }}>Loading Exam...</h2>;

    return (
        <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>

            {/* Header with timer */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#003366",
                color: "white",
                padding: "15px 20px",
                borderRadius: "10px",
                marginBottom: "20px",
                position: "sticky",
                top: 0,
                zIndex: 100
            }}>
                <div>
                    <h2 style={{ margin: 0 }}>📝 Exam</h2>
                    <p style={{ margin: 0, fontSize: "13px" }}>
                        Answered: {Object.keys(answers).length} / {questions.length}
                    </p>
                    {warnings > 0 && (
                        <p style={{ margin: 0, fontSize: "13px", color: "#ffcc00" }}>
                            ⚠️ Tab Warnings: {warnings}/{MAX_WARNINGS}
                        </p>
                    )}
                </div>

                {/* Countdown Timer */}
                {timeLeft !== null && (
                    <div style={{
                        background: "white",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        textAlign: "center"
                    }}>
                        <div style={{ fontSize: "11px", color: "#666" }}>Time Left</div>
                        <div style={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            color: getTimerColor()
                        }}>
                            ⏱ {formatTime(timeLeft)}
                        </div>
                    </div>
                )}
            </div>

            {/* Questions */}
            {questions.map((q, index) => (
                <div key={q.examQuestionId} style={{
                    border: "1px solid #ddd",
                    margin: "15px 0",
                    padding: "20px",
                    borderRadius: "10px",
                    background: answers[q.question.questionId] ? "#f0fff0" : "#fff"
                }}>
                    <h3>Q{index + 1}. {q.question?.questionText}</h3>

                    {(optionsMap[q.question.questionId] || []).map(option => (
                        <div key={option.optionId} style={{ margin: "8px 0" }}>
                            <label style={{ cursor: "pointer" }}>
                                <input
                                    type="radio"
                                    name={"question-" + q.question.questionId}
                                    value={option.optionId}
                                    checked={answers[q.question.questionId] === option.optionId}
                                    onChange={() => handleAnswerChange(q.question.questionId, option.optionId)}
                                    style={{ marginRight: "8px" }}
                                />
                                {option.optionText}
                            </label>
                        </div>
                    ))}
                </div>
            ))}

            <button
                onClick={submitExam}
                disabled={submitting}
                style={{
                    padding: "12px 30px",
                    marginTop: "20px",
                    background: submitting ? "#999" : "#003366",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    cursor: submitting ? "not-allowed" : "pointer"
                }}
            >
                {submitting ? "Submitting..." : "✅ Submit Exam"}
            </button>

        </div>
    );
}

export default StudentExamPage;