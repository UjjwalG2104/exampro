import React, { useEffect, useState } from "react";

import {
    getFaculties,
    createFaculty,
    updateFaculty,
    deleteFaculty,
    getDepartments,
    getUsers
} from "../../../api/api";

import "./Faculty.css";


function Faculty() {

    const [faculties, setFaculties] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [users, setUsers] = useState([]);

    const [editingId, setEditingId] = useState(null);


    const [faculty, setFaculty] = useState({
        user: {
            id: ""
        },
        employeeCode: "",
        fullName: "",
        department: {
            departmentId: ""
        },
        qualification: ""
    });


    useEffect(() => {

        loadFaculties();
        loadDepartments();
        loadUsers();

    }, []);


    // Load Faculty
    const loadFaculties = async () => {

        try {

            const response = await getFaculties();

            setFaculties(response.data);

        } catch(error) {

            console.log(error);

            alert("Failed to load faculty");
        }
    };


    // Load Departments
    const loadDepartments = async () => {

        try {

            const response = await getDepartments();

            setDepartments(response.data);

        } catch(error) {

            console.log(error);
        }
    };


    // Load Users
    const loadUsers = async () => {

        try {

            const response = await getUsers();

            setUsers(response.data);

        } catch(error) {

            console.log(error);
        }
    };


    // Input Change
    const handleChange = (e) => {

        const {name, value} = e.target;


        if(name === "userId") {

            setFaculty({
                ...faculty,
                user: {
                    id: Number(value)
                }
            });

        }

        else if(name === "departmentId") {

            setFaculty({
                ...faculty,
                department: {
                    departmentId: Number(value)
                }
            });

        }

        else {

            setFaculty({
                ...faculty,
                [name]: value
            });

        }

    };


    // Add / Update Faculty
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if(editingId) {

                await updateFaculty(editingId, faculty);

                alert("Faculty updated successfully");

            }

            else {

                await createFaculty(faculty);

                alert("Faculty created successfully");

            }


            resetForm();

            loadFaculties();

        }
        catch(error) {

            console.log(error);

            alert("Operation failed");

        }

    };


    // Edit Faculty
    const handleEdit = (item) => {


        setEditingId(item.facultyId);


        setFaculty({

            user: {
                id: item.user.id
            },

            employeeCode: item.employeeCode,

            fullName: item.fullName,

            department: {
                departmentId:
                    item.department.departmentId
            },

            qualification: item.qualification

        });

    };


    // Delete Faculty
    const handleDelete = async(id) => {


        if(window.confirm("Delete this faculty?")) {

            try {

                await deleteFaculty(id);

                alert("Faculty deleted");

                loadFaculties();

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


        setFaculty({

            user: {
                id: ""
            },

            employeeCode: "",

            fullName: "",

            department: {
                departmentId: ""
            },

            qualification: ""

        });

    };


    return (

        <div className="faculty-container">


            <h1>Faculty Management</h1>


            <form onSubmit={handleSubmit}>


                <select
                    name="userId"
                    value={faculty.user.id}
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
                    name="employeeCode"
                    placeholder="Employee Code"
                    value={faculty.employeeCode}
                    onChange={handleChange}
                    required
                />


                <input
                    name="fullName"
                    placeholder="Full Name"
                    value={faculty.fullName}
                    onChange={handleChange}
                    required
                />


                <select
                    name="departmentId"
                    value={faculty.department.departmentId}
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
                    name="qualification"
                    placeholder="Qualification"
                    value={faculty.qualification}
                    onChange={handleChange}
                    required
                />


                <button type="submit">

                    {
                        editingId
                        ?
                        "Update Faculty"
                        :
                        "Add Faculty"
                    }

                </button>


            </form>


            <hr />


            <table>


                <thead>

                    <tr>

                        <th>ID</th>
                        <th>User</th>
                        <th>Employee Code</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Qualification</th>
                        <th>Actions</th>

                    </tr>

                </thead>


                <tbody>


                {
                    faculties.map(item => (

                        <tr key={item.facultyId}>

                            <td>{item.facultyId}</td>

                            <td>{item.user?.username}</td>

                            <td>{item.employeeCode}</td>

                            <td>{item.fullName}</td>

                            <td>
                                {item.department?.departmentName}
                            </td>

                            <td>{item.qualification}</td>


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
                                        handleDelete(item.facultyId)
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


export default Faculty;