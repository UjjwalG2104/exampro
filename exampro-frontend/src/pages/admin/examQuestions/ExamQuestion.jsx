import React, { useEffect, useState } from "react";

import {
    getExamQuestions,
    createExamQuestion,
    updateExamQuestion,
    deleteExamQuestion,
    getExams,
    getQuestions
} from "../../../api/api";

import "./ExamQuestion.css";


function ExamQuestion() {

    const [examQuestions, setExamQuestions] = useState([]);
    const [exams, setExams] = useState([]);
    const [questions, setQuestions] = useState([]);

    const [editingId, setEditingId] = useState(null);


    const [data, setData] = useState({

        exam: {
            examId: ""
        },

        question: {
            questionId: ""
        },

        questionOrder: "",

        marks: ""

    });


    useEffect(() => {

        loadExamQuestions();
        loadExams();
        loadQuestions();

    }, []);


    const loadExamQuestions = async () => {

        try {

            const response = await getExamQuestions();

            setExamQuestions(response.data);

        }
        catch(error) {

            console.log(error);

            alert("Failed to load exam questions");

        }

    };


    const loadExams = async () => {

        try {

            const response = await getExams();

            setExams(response.data);

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


    const handleChange = (e) => {

        const {name, value} = e.target;


        if(name === "examId") {

            setData({

                ...data,

                exam: {
                    examId: Number(value)
                }

            });

        }

        else if(name === "questionId") {

            setData({

                ...data,

                question: {
                    questionId: Number(value)
                }

            });

        }

        else {

            setData({

                ...data,

                [name]: value

            });

        }

    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        try {


            if(editingId) {


                await updateExamQuestion(
                    editingId,
                    data
                );


                alert("Exam Question Updated");


            }

            else {


                await createExamQuestion(
                    data
                );


                alert("Question Added To Exam");

            }


            resetForm();

            loadExamQuestions();


        }
        catch(error) {


            console.log(error);


            alert("Operation Failed");

        }

    };



    const handleEdit = (item) => {


        setEditingId(item.examQuestionId);


        setData({

            exam: {
                examId: item.exam.examId
            },

            question: {
                questionId: item.question.questionId
            },

            questionOrder: item.questionOrder,

            marks: item.marks

        });

    };



    const handleDelete = async(id) => {


        if(window.confirm("Delete this mapping?")) {


            try {


                await deleteExamQuestion(id);


                alert("Deleted Successfully");


                loadExamQuestions();


            }

            catch(error) {


                console.log(error);


                alert("Delete Failed");

            }


        }

    };



    const resetForm = () => {


        setEditingId(null);


        setData({

            exam: {
                examId: ""
            },

            question: {
                questionId: ""
            },

            questionOrder: "",

            marks: ""

        });

    };


    return (

        <div className="exam-question-container">


            <h1>
                Exam Question Management
            </h1>


            <form onSubmit={handleSubmit}>


                <select
                    name="examId"
                    value={data.exam.examId}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Exam
                    </option>


                    {
                        exams.map(exam => (

                        <option
                            key={exam.examId}
                            value={exam.examId}
                        >

                            {exam.examTitle}

                        </option>

                        ))
                    }


                </select>



                <select
                    name="questionId"
                    value={data.question.questionId}
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


                <input
                    type="number"
                    name="questionOrder"
                    placeholder="Question Order"
                    value={data.questionOrder}
                    onChange={handleChange}
                    required
                />


                <input
                    type="number"
                    name="marks"
                    placeholder="Marks"
                    value={data.marks}
                    onChange={handleChange}
                    required
                />


                <button type="submit">

                    {
                        editingId
                        ?
                        "Update Mapping"
                        :
                        "Add Question"
                    }

                </button>


            </form>


            <hr/>


            <table>


                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Exam</th>
                        <th>Question</th>
                        <th>Order</th>
                        <th>Marks</th>
                        <th>Actions</th>

                    </tr>

                </thead>


                <tbody>


                {
                    examQuestions.map(item => (

                    <tr key={item.examQuestionId}>

                        <td>
                            {item.examQuestionId}
                        </td>


                        <td>
                            {item.exam?.examTitle}
                        </td>


                        <td>
                            {item.question?.questionText}
                        </td>


                        <td>
                            {item.questionOrder}
                        </td>


                        <td>
                            {item.marks}
                        </td>


                        <td>


                            <button
                            onClick={() =>
                            handleEdit(item)}>
                                Edit
                            </button>


                            <button
                            onClick={() =>
                            handleDelete(item.examQuestionId)}>
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


export default ExamQuestion;