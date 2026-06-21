import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
getExamQuestionsByExamId,
getOptionsByQuestionId
} from "../../api/api";

function StudentExamPage() {


const { examId } = useParams();

const [questions, setQuestions] = useState([]);
const [optionsMap, setOptionsMap] = useState({});
const [answers, setAnswers] = useState({});
console.log(
    "getExamQuestionsByExamId =",
    getExamQuestionsByExamId
);

console.log(
    "getOptionsByQuestionId =",
    getOptionsByQuestionId
);

useEffect(() => {
    loadQuestions();
}, []);

const loadQuestions = async () => {

    try {

        const response =
            await getExamQuestionsByExamId(examId);

        setQuestions(response.data);

        for (const q of response.data) {

            const optionResponse =
                await getOptionsByQuestionId(
                    q.question.questionId
                );

            setOptionsMap(prev => ({
                ...prev,
                [q.question.questionId]:
                    optionResponse.data
            }));
        }

    } catch (error) {

        console.error(error);
    }
};

const handleAnswerChange = (
    questionId,
    optionId
) => {

    setAnswers(prev => ({
        ...prev,
        [questionId]: optionId
    }));
};

const submitExam = () => {

    console.log("Selected Answers");

    console.log(answers);

    alert(
        "Exam submission API will be connected next."
    );
};

return (

    <div style={{ padding: "30px" }}>

        <h1>
            Exam ID: {examId}
        </h1>

        {questions.map((q, index) => (

            <div
                key={q.examQuestionId}
                style={{
                    border: "1px solid #ddd",
                    margin: "15px 0",
                    padding: "15px",
                    borderRadius: "10px"
                }}
            >

                <h3>
                    Q{index + 1}.{" "}
                    {q.question?.questionText}
                </h3>

                {(optionsMap[
                    q.question.questionId
                ] || []).map(option => (

                    <div key={option.optionId}>

                        <label>

                            <input
                                type="radio"
                                name={
                                    "question-" +
                                    q.question.questionId
                                }
                                value={
                                    option.optionId
                                }
                                checked={
                                    answers[
                                        q.question.questionId
                                    ] ===
                                    option.optionId
                                }
                                onChange={() =>
                                    handleAnswerChange(
                                        q.question.questionId,
                                        option.optionId
                                    )
                                }
                            />

                            {" "}
                            {option.optionText}

                        </label>

                    </div>

                ))}

            </div>

        ))}

        <button
            onClick={submitExam}
            style={{
                padding: "10px 20px",
                marginTop: "20px"
            }}
        >
            Submit Exam
        </button>

    </div>
);


}

export default StudentExamPage;
