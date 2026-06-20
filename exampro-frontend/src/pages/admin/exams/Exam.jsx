import React, { useEffect, useState } from "react";

import {
    getExams,
    createExam,
    updateExam,
    deleteExam,
    getCourses,
    getFaculties
} from "../../../api/api";

import "./Exam.css";


function Exam() {

    const [exams, setExams] = useState([]);
    const [courses, setCourses] = useState([]);
    const [faculties, setFaculties] = useState([]);

    const [editingId, setEditingId] = useState(null);


    const [exam, setExam] = useState({

        examTitle: "",
        examDescription: "",

        course: {
            courseId: ""
        },

        faculty: {
            facultyId: ""
        },

        totalMarks: "",
        durationMinutes: "",

        startTime: "",
        endTime: "",

        examStatus: "DRAFT"
    });


    useEffect(() => {

        loadExams();
        loadCourses();
        loadFaculties();

    }, []);


    // Load exams
    const loadExams = async () => {

        try {

            const response = await getExams();

            setExams(response.data);

        } catch(error) {

            console.log(error);

            alert("Failed to load exams");

        }

    };


    // Load courses
    const loadCourses = async () => {

        try {

            const response = await getCourses();

            setCourses(response.data);

        } catch(error) {

            console.log(error);

        }

    };


    // Load faculties
    const loadFaculties = async () => {

        try {

            const response = await getFaculties();

            setFaculties(response.data);

        } catch(error) {

            console.log(error);

        }

    };


    // Handle Input
    const handleChange = (e) => {

        const {name, value} = e.target;


        if(name === "courseId") {

            setExam({
                ...exam,
                course: {
                    courseId: Number(value)
                }
            });

        }

        else if(name === "facultyId") {

            setExam({
                ...exam,
                faculty: {
                    facultyId: Number(value)
                }
            });

        }

        else {

            setExam({
                ...exam,
                [name]: value
            });

        }

    };


    // Add / Update Exam
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if(editingId) {

                await updateExam(editingId, exam);

                alert("Exam updated successfully");

            }

            else {

                await createExam(exam);

                alert("Exam created successfully");

            }


            resetForm();

            loadExams();

        }
        catch(error) {

            console.log(error);

            alert("Operation failed");

        }

    };


    // Edit Exam
    const handleEdit = (item) => {

        setEditingId(item.examId);


        setExam({

            examTitle: item.examTitle,

            examDescription: item.examDescription,

            course: {
                courseId: item.course.courseId
            },

            faculty: {
                facultyId: item.faculty.facultyId
            },

            totalMarks: item.totalMarks,

            durationMinutes: item.durationMinutes,

            startTime: item.startTime.slice(0,16),

            endTime: item.endTime.slice(0,16),

            examStatus: item.examStatus

        });

    };


    // Delete Exam
    const handleDelete = async(id) => {

        if(window.confirm("Delete this exam?")) {

            try {

                await deleteExam(id);

                alert("Exam deleted");

                loadExams();

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

        setExam({

            examTitle: "",
            examDescription: "",

            course: {
                courseId: ""
            },

            faculty: {
                facultyId: ""
            },

            totalMarks: "",
            durationMinutes: "",

            startTime: "",
            endTime: "",

            examStatus: "DRAFT"

        });

    };


    return (

        <div className="exam-container">

            <h1>
                Exam Management
            </h1>


            <form onSubmit={handleSubmit}>


                <input
                    name="examTitle"
                    placeholder="Exam Title"
                    value={exam.examTitle}
                    onChange={handleChange}
                    required
                />


                <input
                    name="examDescription"
                    placeholder="Description"
                    value={exam.examDescription}
                    onChange={handleChange}
                />


                <select
                    name="courseId"
                    value={exam.course.courseId}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Course
                    </option>


                    {
                        courses.map(course => (

                        <option
                            key={course.courseId}
                            value={course.courseId}
                        >
                            {course.courseName}
                        </option>

                        ))
                    }

                </select>


                <select
                    name="facultyId"
                    value={exam.faculty.facultyId}
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


                <input type="number"
                    name="totalMarks"
                    placeholder="Total Marks"
                    value={exam.totalMarks}
                    onChange={handleChange}
                    required
                />


                <input type="number"
                    name="durationMinutes"
                    placeholder="Duration Minutes"
                    value={exam.durationMinutes}
                    onChange={handleChange}
                    required
                />


                <input
                    type="datetime-local"
                    name="startTime"
                    value={exam.startTime}
                    onChange={handleChange}
                    required
                />


                <input
                    type="datetime-local"
                    name="endTime"
                    value={exam.endTime}
                    onChange={handleChange}
                    required
                />


                <select
                    name="examStatus"
                    value={exam.examStatus}
                    onChange={handleChange}
                >

                    <option>DRAFT</option>
                    <option>ACTIVE</option>
                    <option>COMPLETED</option>

                </select>


                <button type="submit">

                    {editingId
                        ? "Update Exam"
                        : "Add Exam"}

                </button>


            </form>


            <hr/>


            <table>

                <thead>

                <tr>

                    <th>ID</th>
                    <th>Title</th>
                    <th>Course</th>
                    <th>Faculty</th>
                    <th>Marks</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Actions</th>

                </tr>

                </thead>


                <tbody>

                {
                    exams.map(item => (

                    <tr key={item.examId}>

                        <td>{item.examId}</td>

                        <td>{item.examTitle}</td>

                        <td>
                            {item.course?.courseName}
                        </td>

                        <td>
                            {item.faculty?.fullName}
                        </td>

                        <td>{item.totalMarks}</td>

                        <td>
                            {item.durationMinutes} mins
                        </td>

                        <td>
                            {item.examStatus}
                        </td>


                        <td>

                            <button
                             onClick={() => handleEdit(item)}>
                                Edit
                            </button>


                            <button
                             onClick={() => handleDelete(item.examId)}>
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


export default Exam;