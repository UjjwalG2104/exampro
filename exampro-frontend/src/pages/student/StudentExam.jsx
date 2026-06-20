import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExams } from "../../api/api";
import "./StudentExam.css";

function StudentExam() {

    const [exams, setExams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadExams();
    }, []);

    const loadExams = async () => {

        try {

            const response = await getExams();

            console.log("EXAMS DATA =", response.data);

            setExams(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="student-exams">

            <h1>📝 Available Exams</h1>

            <h2>Total Exams: {exams.length}</h2>

            <div className="exam-list">

                {exams.map((exam) => (

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

                        <button
                            onClick={() =>
                                navigate(`/student/exam-page/${exam.examId}`)
                            }
                        >
                            Start Exam
                        </button>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default StudentExam;