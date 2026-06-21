import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
getExams,
createExamSession
} from "../../api/api";

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

        setExams(response.data);

    } catch (error) {

        console.error(error);

    } finally {

        setLoading(false);
    }
};
console.log("useState =", useState);
console.log("useEffect =", useEffect);
console.log("getExams =", getExams);
console.log("createExamSession =", createExamSession);

const startExam = async (examId) => {

    try {

        const studentId =
            localStorage.getItem("studentId");

        if (!studentId) {

            alert(
                "Student ID not found. Please login again."
            );

            return;
        }

        const response =
            await createExamSession({
                exam: {
                    examId: examId
                },
                student: {
                    studentId: Number(studentId)
                }
            });

        localStorage.setItem(
            "sessionId",
            response.data.sessionId
        );

        navigate("/student/exam-page/" + examId);

    } catch (error) {

        console.error(error);

        alert(
            "Failed to start exam session"
        );
    }
};

if (loading) {
    return <h2>Loading Exams...</h2>;
}

return (

    <div className="student-exams">

        <h1>📝 Available Exams</h1>

        <h2>Total Exams: {exams.length}</h2>

        <div className="exam-list">

            {exams.length === 0 ? (

                <h3>No Exams Available</h3>

            ) : (

                exams.map((exam) => (

                    <div
                        key={exam.examId}
                        className="exam-card"
                    >

                        <h3>
                            {exam.examTitle}
                        </h3>

                        <p>
                            Exam ID: {exam.examId}
                        </p>

                        <p>
                            Duration: {exam.durationMinutes} Minutes
                        </p>

                        <p>
                            Total Marks: {exam.totalMarks}
                        </p>

                        <button
                            onClick={() =>
                                startExam(
                                    exam.examId
                                )
                            }
                        >
                            Start Exam
                        </button>

                    </div>

                ))

            )}

        </div>

    </div>
);


}

export default StudentExam;
