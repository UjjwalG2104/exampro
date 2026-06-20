import React, { useEffect, useState } from "react";

import {
    getResults,
    createResult,
    updateResult,
    deleteResult,
    getExamSessions
} from "../../../api/api";

import "./Result.css";


function Result() {

    const [results, setResults] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [editingId, setEditingId] = useState(null);


    const [result, setResult] = useState({

        session: {
            sessionId: ""
        },

        totalMarks: "",
        obtainedMarks: "",
        percentage: "",
        resultStatus: "PASS",
        rankPosition: ""

    });


    useEffect(() => {

        loadResults();
        loadSessions();

    }, []);


    const loadResults = async () => {

        try {

            const response = await getResults();

            setResults(response.data);

        } catch(error) {

            console.log(error);
            alert("Failed to load results");

        }

    };


    const loadSessions = async () => {

        try {

            const response = await getExamSessions();

            setSessions(response.data);

        } catch(error) {

            console.log(error);

        }

    };


    const handleChange = (e) => {

        const { name, value } = e.target;


        if(name === "sessionId") {

            setResult({

                ...result,

                session: {
                    sessionId: Number(value)
                }

            });

        }

        else {

            setResult({

                ...result,
                [name]: value

            });

        }

    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            if(editingId) {

                await updateResult(
                    editingId,
                    result
                );

                alert("Result Updated Successfully");

            }

            else {

                await createResult(result);

                alert("Result Added Successfully");

            }


            resetForm();
            loadResults();


        } catch(error) {

            console.log(error);
            alert("Operation Failed");

        }

    };


    const handleEdit = (item) => {

        setEditingId(item.resultId);


        setResult({

            session: {
                sessionId: item.session.sessionId
            },

            totalMarks: item.totalMarks,

            obtainedMarks: item.obtainedMarks,

            percentage: item.percentage,

            resultStatus: item.resultStatus,

            rankPosition: item.rankPosition

        });

    };


    const handleDelete = async(id) => {

        if(window.confirm("Delete this result?")) {

            try {

                await deleteResult(id);

                alert("Result Deleted");

                loadResults();

            }

            catch(error) {

                console.log(error);

                alert("Delete Failed");

            }

        }

    };


    const resetForm = () => {

        setEditingId(null);

        setResult({

            session: {
                sessionId: ""
            },

            totalMarks: "",

            obtainedMarks: "",

            percentage: "",

            resultStatus: "PASS",

            rankPosition: ""

        });

    };


    return (

        <div className="result-container">


            <h1>
                Result Management
            </h1>


            <form onSubmit={handleSubmit}>


                <select
                    name="sessionId"
                    value={result.session.sessionId}
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


                <input
                    type="number"
                    name="totalMarks"
                    placeholder="Total Marks"
                    value={result.totalMarks}
                    onChange={handleChange}
                    required
                />


                <input
                    type="number"
                    name="obtainedMarks"
                    placeholder="Obtained Marks"
                    value={result.obtainedMarks}
                    onChange={handleChange}
                    required
                />


                <input
                    type="number"
                    name="percentage"
                    placeholder="Percentage"
                    value={result.percentage}
                    onChange={handleChange}
                    required
                />


                <select
                    name="resultStatus"
                    value={result.resultStatus}
                    onChange={handleChange}
                >

                    <option value="PASS">
                        PASS
                    </option>

                    <option value="FAIL">
                        FAIL
                    </option>

                </select>


                <input
                    type="number"
                    name="rankPosition"
                    placeholder="Rank Position"
                    value={result.rankPosition}
                    onChange={handleChange}
                />


                <button type="submit">

                    {
                        editingId
                        ?
                        "Update Result"
                        :
                        "Add Result"
                    }

                </button>


            </form>


            <hr/>


            <table>

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Session</th>
                        <th>Total</th>
                        <th>Obtained</th>
                        <th>%</th>
                        <th>Status</th>
                        <th>Rank</th>
                        <th>Actions</th>

                    </tr>

                </thead>


                <tbody>

                {
                    results.map(item => (

                    <tr key={item.resultId}>


                        <td>
                            {item.resultId}
                        </td>


                        <td>
                            {item.session?.sessionId}
                        </td>


                        <td>
                            {item.totalMarks}
                        </td>


                        <td>
                            {item.obtainedMarks}
                        </td>


                        <td>
                            {item.percentage}
                        </td>


                        <td>
                            {item.resultStatus}
                        </td>


                        <td>
                            {item.rankPosition}
                        </td>


                        <td>

                            <button
                            onClick={() =>
                            handleEdit(item)}>
                                Edit
                            </button>


                            <button
                            onClick={() =>
                            handleDelete(item.resultId)}>
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


export default Result;