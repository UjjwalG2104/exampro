import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExamQuestionsByExamId } from "../../api/api";

function StudentExamPage() {

    const { examId } = useParams();

    const [questions, setQuestions] = useState([]);

    useEffect(() => {

        loadQuestions();

    }, []);

    const loadQuestions = async () => {

        try {

            const response =
                await getExamQuestionsByExamId(examId);

            console.log(response.data);

            setQuestions(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h1>
                Exam ID: {examId}
            </h1>

            {
                questions.map((q, index) => (

                    <div
                        key={q.examQuestionId}
                        style={{
                            border: "1px solid #ddd",
                            margin: "15px 0",
                            padding: "15px"
                        }}
                    >

                        <h3>
                            Q{index + 1}.
                            {q.question?.questionText}
                        </h3>

                    </div>

                ))
            }

        </div>

    );

}

export default StudentExamPage;