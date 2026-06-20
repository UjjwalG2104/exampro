import React, { useEffect, useState } from "react";

import {
    getStudentAnswers,
    createStudentAnswer,
    updateStudentAnswer,
    deleteStudentAnswer,
    getExamSessions,
    getQuestions,
    getOptions
} from "../../../api/api";

import "./StudentAnswer.css";


function StudentAnswer() {

    const [answers, setAnswers] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);

    const [editingId, setEditingId] = useState(null);


    const [answer, setAnswer] = useState({

        session: {
            sessionId: ""
        },

        question: {
            questionId: ""
        },

        option: {
            optionId: ""
        },

        answerText: "",

        marksObtained: ""

    });


    useEffect(() => {

        loadAnswers();
        loadSessions();
        loadQuestions();
        loadOptions();

    }, []);



    const loadAnswers = async () => {

        try {

            const response = await getStudentAnswers();

            setAnswers(response.data);

        }
        catch(error) {

            console.log(error);

            alert("Failed to load answers");

        }

    };



    const loadSessions = async () => {

        try {

            const response = await getExamSessions();

            setSessions(response.data);

        }
        catch(error) {

            console.log(error);

        }

    };



    const loadQuestions = async () => {

        try {

            const response = await getQuestions();

            setQuestions(response.data);

        }
        catch(error) {

            console.log(error);

        }

    };



    const loadOptions = async () => {

        try {

            const response = await getOptions();

            setOptions(response.data);

        }
        catch(error) {

            console.log(error);

        }

    };


    const handleChange = (e) => {

        const {name, value} = e.target;


        if(name === "sessionId") {

            setAnswer({

                ...answer,

                session: {
                    sessionId: Number(value)
                }

            });

        }

        else if(name === "questionId") {

            setAnswer({

                ...answer,

                question: {
                    questionId: Number(value)
                }

            });

        }

        else if(name === "optionId") {

            setAnswer({

                ...answer,

                option: {
                    optionId: Number(value)
                }

            });

        }

        else {

            setAnswer({

                ...answer,

                [name]: value

            });

        }

    };


    const handleSubmit = async(e) => {

        e.preventDefault();


        try {


            if(editingId) {

                await updateStudentAnswer(
                    editingId,
                    answer
                );

                alert("Answer Updated Successfully");

            }

            else {

                await createStudentAnswer(answer);

                alert("Answer Submitted Successfully");

            }


            resetForm();

            loadAnswers();


        }
        catch(error) {

            console.log(error);

            alert("Operation Failed");

        }

    };



    const handleEdit = (item) => {


        setEditingId(item.answerId);


        setAnswer({

            session: {
                sessionId: item.session.sessionId
            },

            question: {
                questionId: item.question.questionId
            },

            option: {
                optionId: item.option.optionId
            },

            answerText: item.answerText,

            marksObtained: item.marksObtained

        });

    };


    const handleDelete = async(id) => {


        if(window.confirm("Delete this answer?")) {


            try {


                await deleteStudentAnswer(id);

                alert("Answer Deleted");

                loadAnswers();


            }
            catch(error) {


                console.log(error);

                alert("Delete Failed");

            }

        }

    };


    const resetForm = () => {


        setEditingId(null);


        setAnswer({

            session: {
                sessionId: ""
            },

            question: {
                questionId: ""
            },

            option: {
                optionId: ""
            },

            answerText: "",

            marksObtained: ""

        });

    };


    return (

        <div className="answer-container">

            <h1>
                Student Answer Management
            </h1>


            <form onSubmit={handleSubmit}>


                <select
                    name="sessionId"
                    value={answer.session.sessionId}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        Select Exam Session
                    </option>

                    {
                        sessions.map(session => (

                        <option
                            key={session.sessionId}
                            value={session.sessionId}
                        >
                            Session #{session.sessionId}
                        </option>

                        ))
                    }

                </select>


                <select
                    name="questionId"
                    value={answer.question.questionId}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        Select Question
                    </option>

                    {
                        questions.map(question => (

                        <option
                            key={question.questionId}
                            value={question.questionId}
                        >
                            {question.questionText}
                        </option>

                        ))
                    }

                </select>


                <select
                    name="optionId"
                    value={answer.option.optionId}
                    onChange={handleChange}
                >
                    <option value="">
                        Select Option
                    </option>

                    {
                        options.map(option => (

                        <option
                            key={option.optionId}
                            value={option.optionId}
                        >
                            {option.optionText}
                        </option>

                        ))
                    }

                </select>


                <input
                    type="text"
                    name="answerText"
                    placeholder="Answer Text"
                    value={answer.answerText}
                    onChange={handleChange}
                />


                <input
                    type="number"
                    name="marksObtained"
                    placeholder="Marks Obtained"
                    value={answer.marksObtained}
                    onChange={handleChange}
                />


                <button type="submit">

                    {
                        editingId
                        ? "Update Answer"
                        : "Submit Answer"
                    }

                </button>


            </form>


            <hr/>


            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Session</th>
                        <th>Question</th>
                        <th>Option</th>
                        <th>Answer</th>
                        <th>Marks</th>
                        <th>Actions</th>
                    </tr>

                </thead>


                <tbody>

                {
                    answers.map(item => (

                    <tr key={item.answerId}>

                        <td>{item.answerId}</td>

                        <td>
                            {item.session?.sessionId}
                        </td>

                        <td>
                            {item.question?.questionText}
                        </td>

                        <td>
                            {item.option?.optionText}
                        </td>

                        <td>
                            {item.answerText}
                        </td>

                        <td>
                            {item.marksObtained}
                        </td>


                        <td>

                            <button
                             onClick={() => handleEdit(item)}>
                                Edit
                            </button>


                            <button
                             onClick={() =>
                             handleDelete(item.answerId)}>
                                Delete
                            </button>

                        </td>

                    </tr>

                    ))
                }


                </tbody>

            </table>


        </div>

    );

}


export default StudentAnswer;