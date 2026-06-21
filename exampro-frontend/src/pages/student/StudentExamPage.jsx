import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    getExamQuestionsByExamId,
    getOptionsByQuestionId,
    createStudentAnswer,
    completeExamSession
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

    useEffect(() => {
        loadQuestions();
    }, []);

    const loadQuestions = async () => {
        try {
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
            alert("Failed to load exam questions.");
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerChange = (questionId, optionId) => {
        setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    };

    const submitExam = async () => {
        if (!window.confirm("Are you sure you want to submit the exam?")) return;

        setSubmitting(true);
        try {
            const sessionId = localStorage.getItem("sessionId");

            if (!sessionId) {
                alert("Session not found. Please start the exam again.");
                return;
            }

            // Save each selected answer
            for (const [questionId, optionId] of Object.entries(answers)) {
                await createStudentAnswer({
                    session: { sessionId: Number(sessionId) },
                    question: { questionId: Number(questionId) },
                    option: { optionId: Number(optionId) }
                });
            }

            // Mark session as completed
            await completeExamSession(sessionId);

            alert("Exam submitted successfully!");
            navigate("/student/results");

        } catch (error) {
            console.error(error);
            alert("Failed to submit exam. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <h2 style={{ padding: "30px" }}>Loading Questions...</h2>;

    return (
        <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>

            <h1>📝 Exam</h1>
            <p>Total Questions: {questions.length}</p>
            <p>Answered: {Object.keys(answers).length} / {questions.length}</p>

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