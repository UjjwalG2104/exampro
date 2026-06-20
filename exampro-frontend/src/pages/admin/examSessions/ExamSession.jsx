import React, { useEffect, useState } from "react";

import {
    getExamSessions,
    createExamSession,
    completeExamSession,
    terminateExamSession,
    getExams,
    getStudents
} from "../../../api/api";

import "./ExamSession.css";


function ExamSession() {


    const [sessions, setSessions] = useState([]);
    const [exams, setExams] = useState([]);
    const [students, setStudents] = useState([]);


    const [session, setSession] = useState({

        exam: {
            examId: ""
        },

        student: {
            studentId: ""
        },

        warningCount: 0,

        isAutoSubmitted: false,

        sessionStatus: "STARTED"

    });



    useEffect(() => {

        loadSessions();
        loadExams();
        loadStudents();

    }, []);




    const loadSessions = async () => {

        try {

            const response = await getExamSessions();

            setSessions(response.data);

        } catch(error) {

            console.log(error);
        }

    };




    const loadExams = async () => {

        try {

            const response = await getExams();

            setExams(response.data);

        } catch(error) {

            console.log(error);
        }

    };



    const loadStudents = async () => {

        try {

            const response = await getStudents();

            setStudents(response.data);

        } catch(error) {

            console.log(error);
        }

    };




    const handleChange = (e) => {


        const { name, value, type, checked } = e.target;


        if(name === "examId") {

            setSession({

                ...session,

                exam: {
                    examId: Number(value)
                }

            });

        }

        else if(name === "studentId") {


            setSession({

                ...session,

                student: {
                    studentId: Number(value)
                }

            });

        }

        else if(type === "checkbox") {


            setSession({

                ...session,

                [name]: checked

            });

        }


        else {


            setSession({

                ...session,

                [name]: value

            });

        }

    };





    const handleSubmit = async(e) => {


        e.preventDefault();


        try {


            await createExamSession(session);


            alert("Exam Session Started");


            resetForm();


            loadSessions();


        }

        catch(error) {


            console.log(error);


            alert("Failed to start session");

        }

    };




    const completeSession = async(id) => {


        try {


            await completeExamSession(id);


            alert("Exam Completed");


            loadSessions();


        }

        catch(error) {


            console.log(error);

        }

    };




    const terminateSession = async(id) => {


        try {


            await terminateExamSession(id);


            alert("Exam Terminated");


            loadSessions();

        }

        catch(error) {


            console.log(error);

        }

    };




    const resetForm = () => {


        setSession({

            exam: {
                examId: ""
            },

            student: {
                studentId: ""
            },

            warningCount: 0,

            isAutoSubmitted: false,

            sessionStatus: "STARTED"

        });

    };




    return (

        <div className="session-container">


            <h1>
                Exam Session Management
            </h1>


            <form onSubmit={handleSubmit}>


                <select
                    name="examId"
                    value={session.exam.examId}
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
                    name="studentId"
                    value={session.student.studentId}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Student
                    </option>


                    {
                        students.map(student => (

                            <option
                                key={student.studentId}
                                value={student.studentId}
                            >

                                {student.fullName}

                            </option>

                        ))
                    }

                </select>




                <input
                    type="number"
                    name="warningCount"
                    placeholder="Warning Count"
                    value={session.warningCount}
                    onChange={handleChange}
                />



                <label>

                    <input
                        type="checkbox"
                        name="isAutoSubmitted"
                        checked={session.isAutoSubmitted}
                        onChange={handleChange}
                    />

                    Auto Submitted

                </label>


                <br/><br/>


                <button type="submit">

                    Start Exam

                </button>


            </form>


            <hr/>


            <table>


                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Exam</th>
                        <th>Student</th>
                        <th>Warnings</th>
                        <th>Status</th>
                        <th>Auto Submit</th>
                        <th>Actions</th>

                    </tr>

                </thead>


                <tbody>


                {

                    sessions.map(item => (

                    <tr key={item.sessionId}>


                        <td>
                            {item.sessionId}
                        </td>


                        <td>
                            {item.exam?.examTitle}
                        </td>


                        <td>
                            {item.student?.fullName}
                        </td>


                        <td>
                            {item.warningCount}
                        </td>


                        <td>
                            {item.sessionStatus}
                        </td>


                        <td>

                            {
                                item.isAutoSubmitted
                                ? "Yes"
                                : "No"
                            }

                        </td>


                        <td>


                            <button
                            onClick={() =>
                            completeSession(item.sessionId)}>
                                Complete
                            </button>


                            <button
                            onClick={() =>
                            terminateSession(item.sessionId)}>
                                Terminate
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


export default ExamSession;