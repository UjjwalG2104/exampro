import React, { useEffect, useState } from "react";

import {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    getDepartments
} from "../../../api/api";

import "./Course.css";


function Course() {

    const [courses, setCourses] = useState([]);

    const [departments, setDepartments] = useState([]);

    const [editingId, setEditingId] = useState(null);


    const [course, setCourse] = useState({
        courseName: "",
        courseCode: "",
        semester: "",
        credits: "",
        department: {
            departmentId: ""
        }
    });


    useEffect(() => {
        loadCourses();
        loadDepartments();
    }, []);


    // Load courses
    const loadCourses = async () => {

        try {

            const response = await getCourses();

            setCourses(response.data);

        }
        catch(error) {

            console.log(error);

            alert("Failed to load courses");
        }
    };


    // Load departments
    const loadDepartments = async () => {

        try {

            const response = await getDepartments();

            setDepartments(response.data);

        }
        catch(error) {

            console.log(error);
        }
    };


    // Handle inputs
    const handleChange = (e) => {

        const {name, value} = e.target;


        if(name === "departmentId") {

            setCourse({
                ...course,
                department: {
                    departmentId: Number(value)
                }
            });

        }

        else {

            setCourse({
                ...course,
                [name]: value
            });

        }

    };


    // Add / Update
    const handleSubmit = async (e) => {

        e.preventDefault();


        try {


            if(editingId) {

                await updateCourse(
                    editingId,
                    course
                );

                alert("Course Updated Successfully");

            }

            else {

                await createCourse(course);

                alert("Course Created Successfully");

            }


            resetForm();

            loadCourses();

        }
        catch(error) {

            console.log(error);

            alert("Operation Failed");
        }

    };


    // Edit
    const handleEdit = (item) => {


        setEditingId(item.courseId);


        setCourse({

            courseName: item.courseName,

            courseCode: item.courseCode,

            semester: item.semester,

            credits: item.credits,

            department: {
                departmentId:
                item.department.departmentId
            }

        });

    };


    // Delete
    const handleDelete = async(id) => {


        if(window.confirm("Delete this course?")) {


            try {

                await deleteCourse(id);

                alert("Course Deleted");

                loadCourses();

            }
            catch(error) {

                console.log(error);

                alert("Delete Failed");
            }

        }

    };


    // Reset
    const resetForm = () => {


        setEditingId(null);


        setCourse({

            courseName: "",

            courseCode: "",

            semester: "",

            credits: "",

            department: {
                departmentId: ""
            }

        });

    };


    return (

        <div className="course-container">


            <h1>
                Course Management
            </h1>


            <form onSubmit={handleSubmit}>


                <input
                    name="courseName"
                    placeholder="Course Name"
                    value={course.courseName}
                    onChange={handleChange}
                    required
                />


                <input
                    name="courseCode"
                    placeholder="Course Code"
                    value={course.courseCode}
                    onChange={handleChange}
                    required
                />


                <input
                    type="number"
                    name="semester"
                    placeholder="Semester"
                    value={course.semester}
                    onChange={handleChange}
                    required
                />


                <input
                    type="number"
                    name="credits"
                    placeholder="Credits"
                    value={course.credits}
                    onChange={handleChange}
                    required
                />


                <select
                    name="departmentId"
                    value={course.department.departmentId}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Department
                    </option>


                    {
                        departments.map(dept => (

                        <option
                            key={dept.departmentId}
                            value={dept.departmentId}
                        >

                            {dept.departmentName}

                        </option>

                        ))
                    }


                </select>


                <button type="submit">

                    {
                        editingId
                        ?
                        "Update Course"
                        :
                        "Add Course"
                    }

                </button>


            </form>


            <hr />


            <table>


                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Department</th>
                        <th>Semester</th>
                        <th>Credits</th>
                        <th>Actions</th>

                    </tr>

                </thead>


                <tbody>

                    {
                        courses.map(item => (

                        <tr key={item.courseId}>


                            <td>{item.courseId}</td>

                            <td>{item.courseName}</td>

                            <td>{item.courseCode}</td>

                            <td>
                                {item.department?.departmentName}
                            </td>

                            <td>{item.semester}</td>

                            <td>{item.credits}</td>


                            <td>


                                <button
                                    onClick={() => handleEdit(item)}
                                >
                                    Edit
                                </button>


                                <button
                                    onClick={() =>
                                    handleDelete(item.courseId)}
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


export default Course;