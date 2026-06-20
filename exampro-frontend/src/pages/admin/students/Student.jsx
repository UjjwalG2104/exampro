import React, { useEffect, useState } from "react";

import {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    getDepartments,
    getUsers
} from "../../../api/api";

import "./Student.css";


function Student() {

    const [students, setStudents] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [users, setUsers] = useState([]);

    const [editingId, setEditingId] = useState(null);


    const [student, setStudent] = useState({
        user: {
            id: ""
        },
        rollNumber: "",
        fullName: "",
        department: {
            departmentId: ""
        },
        semester: "",
        phone: "",
        photoUrl: ""
    });


    useEffect(() => {

        loadStudents();
        loadDepartments();
        loadUsers();

    }, []);


    // Load students
    const loadStudents = async () => {

        try {

            const response = await getStudents();

            setStudents(response.data);

        } catch(error) {

            console.log(error);

            alert("Failed to load students");

        }

    };


    // Load departments
    const loadDepartments = async () => {

        try {

            const response = await getDepartments();

            setDepartments(response.data);

        } catch(error) {

            console.log(error);

        }

    };


    // Load users
    const loadUsers = async () => {

        try {

            const response = await getUsers();

            setUsers(response.data);

        } catch(error) {

            console.log(error);

        }

    };


    // Handle input
    const handleChange = (e) => {

        const { name, value } = e.target;


        if(name === "userId") {

            setStudent({
                ...student,
                user: {
                    id: Number(value)
                }
            });

        }

        else if(name === "departmentId") {

            setStudent({
                ...student,
                department: {
                    departmentId: Number(value)
                }
            });

        }

        else {

            setStudent({
                ...student,
                [name]: value
            });

        }

    };


    // Add or update student
    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            if(editingId) {

                await updateStudent(editingId, student);

                alert("Student updated successfully");

            }

            else {

                await createStudent(student);

                alert("Student created successfully");

            }


            resetForm();

            loadStudents();

        } catch(error) {

            console.log(error);

            alert("Operation failed");

        }

    };


    // Edit student
    const handleEdit = (item) => {


        setEditingId(item.studentId);


        setStudent({

            user: {
                id: item.user.id
            },

            rollNumber: item.rollNumber,

            fullName: item.fullName,

            department: {
                departmentId: item.department.departmentId
            },

            semester: item.semester,

            phone: item.phone,

            photoUrl: item.photoUrl

        });

    };


    // Delete student
    const handleDelete = async (id) => {


        if(window.confirm("Delete this student?")) {


            try {

                await deleteStudent(id);

                alert("Student deleted");

                loadStudents();

            }

            catch(error) {

                console.log(error);

                alert("Delete failed");

            }

        }

    };


    // Reset form
    const resetForm = () => {


        setEditingId(null);


        setStudent({

            user: {
                id: ""
            },

            rollNumber: "",

            fullName: "",

            department: {
                departmentId: ""
            },

            semester: "",

            phone: "",

            photoUrl: ""

        });

    };


    return (

        <div className="student-container">


            <h1>Student Management</h1>


            <form onSubmit={handleSubmit}>


                <select
                    name="userId"
                    value={student.user.id}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select User
                    </option>


                    {
                        users.map(user => (

                            <option
                                key={user.id}
                                value={user.id}
                            >
                                {user.username}
                            </option>

                        ))
                    }


                </select>


                <input
                    name="rollNumber"
                    placeholder="Roll Number"
                    value={student.rollNumber}
                    onChange={handleChange}
                    required
                />


                <input
                    name="fullName"
                    placeholder="Full Name"
                    value={student.fullName}
                    onChange={handleChange}
                    required
                />


                <select
                    name="departmentId"
                    value={student.department.departmentId}
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


                <input
                    type="number"
                    name="semester"
                    placeholder="Semester"
                    value={student.semester}
                    onChange={handleChange}
                    required
                />


                <input
                    name="phone"
                    placeholder="Phone Number"
                    value={student.phone}
                    onChange={handleChange}
                />


                <input
                    name="photoUrl"
                    placeholder="Photo URL"
                    value={student.photoUrl}
                    onChange={handleChange}
                />


                <button type="submit">

                    {
                        editingId
                        ? "Update Student"
                        : "Add Student"
                    }

                </button>


            </form>


            <hr />


            <table>

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>User</th>
                        <th>Roll No</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Semester</th>
                        <th>Phone</th>
                        <th>Actions</th>

                    </tr>

                </thead>


                <tbody>

                    {
                        students.map(item => (

                            <tr key={item.studentId}>

                                <td>{item.studentId}</td>

                                <td>{item.user?.username}</td>

                                <td>{item.rollNumber}</td>

                                <td>{item.fullName}</td>

                                <td>{item.department?.departmentName}</td>

                                <td>{item.semester}</td>

                                <td>{item.phone}</td>


                                <td>

                                    <button
                                        onClick={() =>
                                            handleEdit(item)
                                        }
                                    >
                                        Edit
                                    </button>


                                    <button
                                        onClick={() =>
                                            handleDelete(item.studentId)
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


export default Student;