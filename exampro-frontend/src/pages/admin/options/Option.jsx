import React, { useEffect, useState } from "react";

import {
    getOptions,
    createOption,
    updateOption,
    deleteOption,
    getQuestions
} from "../../../api/api";

import "./Option.css";


function Option() {

    const [options, setOptions] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [editingId, setEditingId] = useState(null);


    const [option, setOption] = useState({

        question: {
            questionId: ""
        },

        optionText: "",

        isCorrect: false

    });


    useEffect(() => {

        loadOptions();
        loadQuestions();

    }, []);


    // Load Options
    const loadOptions = async () => {

        try {

            const response = await getOptions();

            setOptions(response.data);

        }
        catch(error) {

            console.log(error);

            alert("Failed to load options");

        }

    };


    // Load Questions
    const loadQuestions = async () => {

        try {

            const response = await getQuestions();

            setQuestions(response.data);

        }
        catch(error) {

            console.log(error);

        }

    };


    // Handle Change
    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;


        if(name === "questionId") {

            setOption({

                ...option,

                question: {
                    questionId: Number(value)
                }

            });

        }

        else if(type === "checkbox") {

            setOption({

                ...option,

                isCorrect: checked

            });

        }

        else {

            setOption({

                ...option,

                [name]: value

            });

        }

    };


    // Add / Update
    const handleSubmit = async (e) => {

        e.preventDefault();


        try {


            if(editingId) {


                await updateOption(
                    editingId,
                    option
                );


                alert("Option updated successfully");

            }

            else {


                await createOption(option);


                alert("Option added successfully");

            }


            resetForm();

            loadOptions();


        }
        catch(error) {


            console.log(error);


            alert("Operation failed");

        }

    };


    // Edit Option
    const handleEdit = (item) => {


        setEditingId(item.optionId);


        setOption({

            question: {
                questionId: item.question.questionId
            },

            optionText: item.optionText,

            isCorrect: item.isCorrect

        });


    };


    // Delete Option
    const handleDelete = async (id) => {


        if(window.confirm("Delete this option?")) {


            try {


                await deleteOption(id);


                alert("Option deleted");


                loadOptions();


            }
            catch(error) {


                console.log(error);


                alert("Delete failed");

            }


        }

    };


    // Reset Form
    const resetForm = () => {


        setEditingId(null);


        setOption({

            question: {
                questionId: ""
            },

            optionText: "",

            isCorrect: false

        });

    };


    return (

        <div className="option-container">


            <h1>
                Option Management
            </h1>


            <form onSubmit={handleSubmit}>


                <select
                    name="questionId"
                    value={option.question.questionId}
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
                    type="text"
                    name="optionText"
                    placeholder="Option Text"
                    value={option.optionText}
                    onChange={handleChange}
                    required
                />


                <label>

                    <input
                        type="checkbox"
                        checked={option.isCorrect}
                        onChange={handleChange}
                    />

                    Correct Answer

                </label>


                <br/><br/>


                <button type="submit">

                    {
                        editingId
                        ?
                        "Update Option"
                        :
                        "Add Option"
                    }

                </button>


            </form>


            <hr/>


            <table>


                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Question</th>
                        <th>Option</th>
                        <th>Correct</th>
                        <th>Actions</th>

                    </tr>

                </thead>


                <tbody>

                {
                    options.map(item => (

                    <tr key={item.optionId}>

                        <td>
                            {item.optionId}
                        </td>


                        <td>
                            {item.question?.questionText}
                        </td>


                        <td>
                            {item.optionText}
                        </td>


                        <td>
                            {item.isCorrect ? "✔ Yes" : "❌ No"}
                        </td>


                        <td>


                            <button
                                onClick={() => handleEdit(item)}
                            >
                                Edit
                            </button>


                            <button
                                onClick={() =>
                                    handleDelete(item.optionId)
                                }
                            >
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


export default Option;