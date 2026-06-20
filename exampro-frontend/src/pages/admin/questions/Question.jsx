import React, { useEffect, useState } from "react";

import {
    getQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getFaculties
} from "../../../api/api";

import "./Question.css";


function Question() {

    const [questions, setQuestions] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [editingId, setEditingId] = useState(null);


    const [question, setQuestion] = useState({

        faculty: {
            facultyId: ""
        },

        questionText: "",
        questionType: "MCQ",
        marks: "",
        difficultyLevel: "EASY"

    });


    useEffect(() => {

        loadQuestions();
        loadFaculties();

    }, []);



    const loadQuestions = async () => {

        try {

            const response = await getQuestions();

            setQuestions(response.data);

        }
        catch(error) {

            console.log(error);

            alert("Failed to load questions");
        }
    };


    const loadFaculties = async () => {

        try {

            const response = await getFaculties();

            setFaculties(response.data);

        }
        catch(error) {

            console.log(error);
        }

    };



    const handleChange = (e) => {

        const { name, value } = e.target;


        if(name === "facultyId") {

            setQuestion({

                ...question,

                faculty: {
                    facultyId: Number(value)
                }

            });

        }
        else {

            setQuestion({

                ...question,
                [name]: value

            });

        }

    };



    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            if(editingId) {

                await updateQuestion(
                    editingId,
                    question
                );

                alert("Question updated successfully");

            }
            else {

                await createQuestion(question);

                alert("Question added successfully");

            }


            resetForm();

            loadQuestions();

        }
        catch(error) {

            console.log(error);

            alert("Operation failed");

        }

    };




    const handleEdit = (item) => {

        setEditingId(item.questionId);


        setQuestion({

            faculty: {
                facultyId: item.faculty.facultyId
            },

            questionText: item.questionText,

            questionType: item.questionType,

            marks: item.marks,

            difficultyLevel: item.difficultyLevel

        });

    };




    const handleDelete = async (id) => {


        if(window.confirm("Delete this question?")) {


            try {

                await deleteQuestion(id);

                alert("Question deleted");

                loadQuestions();

            }
            catch(error) {

                console.log(error);

                alert("Delete failed");

            }

        }

    };




    const resetForm = () => {


        setEditingId(null);


        setQuestion({

            faculty: {
                facultyId: ""
            },

            questionText: "",

            questionType: "MCQ",

            marks: "",

            difficultyLevel: "EASY"

        });

    };



    return (

        <div className="question-container">


            <h1>
                Question Management
            </h1>


            <form onSubmit={handleSubmit}>


                <select
                    name="facultyId"
                    value={question.faculty.facultyId}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Faculty
                    </option>


                    {
                        faculties.map(faculty => (

                            <option
                                key={faculty.facultyId}
                                value={faculty.facultyId}
                            >

                                {faculty.fullName}

                            </option>

                        ))
                    }

                </select>


                <textarea
                    name="questionText"
                    placeholder="Enter Question"
                    value={question.questionText}
                    onChange={handleChange}
                    required
                />


                <select
                    name="questionType"
                    value={question.questionType}
                    onChange={handleChange}
                >

                    <option value="MCQ">MCQ</option>
                    <option value="TRUE_FALSE">
                        TRUE / FALSE
                    </option>
                    <option value="DESCRIPTIVE">
                        DESCRIPTIVE
                    </option>

                </select>


                <input
                    type="number"
                    name="marks"
                    placeholder="Marks"
                    value={question.marks}
                    onChange={handleChange}
                    required
                />


                <select
                    name="difficultyLevel"
                    value={question.difficultyLevel}
                    onChange={handleChange}
                >

                    <option value="EASY">EASY</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HARD">HARD</option>

                </select>


                <button type="submit">

                    {
                        editingId
                        ?
                        "Update Question"
                        :
                        "Add Question"
                    }

                </button>


            </form>


            <hr />


            <table>

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Faculty</th>
                        <th>Question</th>
                        <th>Type</th>
                        <th>Marks</th>
                        <th>Difficulty</th>
                        <th>Actions</th>

                    </tr>

                </thead>


                <tbody>

                {
                    questions.map(item => (

                    <tr key={item.questionId}>

                        <td>{item.questionId}</td>

                        <td>
                            {item.faculty?.fullName}
                        </td>

                        <td>
                            {item.questionText}
                        </td>

                        <td>
                            {item.questionType}
                        </td>

                        <td>
                            {item.marks}
                        </td>

                        <td>
                            {item.difficultyLevel}
                        </td>


                        <td>

                            <button
                            onClick={() => handleEdit(item)}>
                                Edit
                            </button>


                            <button
                            onClick={() =>
                            handleDelete(item.questionId)}>
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


export default Question;