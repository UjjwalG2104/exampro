import React, { useEffect, useState } from "react";

import {
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment
} from "../../../api/api";

import "./Department.css";


function Department() {


    const [departments, setDepartments] = useState([]);

    const [department, setDepartment] = useState({
        departmentName: "",
        description: ""
    });


    const [editingId, setEditingId] = useState(null);



    useEffect(() => {
        loadDepartments();
    }, []);




    const loadDepartments = async () => {

        try {

            const response = await getDepartments();

            setDepartments(response.data);

        }
        catch(error) {

            console.log(error);

            alert("Failed to load departments");

        }

    };




    const handleChange = (e) => {

        setDepartment({
            ...department,
            [e.target.name]: e.target.value
        });

    };




    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            if(editingId) {

                await updateDepartment(
                    editingId,
                    department
                );

                alert("Department updated");

            }

            else {

                await createDepartment(
                    department
                );

                alert("Department created");

            }


            setDepartment({
                departmentName: "",
                description: ""
            });


            setEditingId(null);


            loadDepartments();


        }
        catch(error) {

            console.log(error);

            alert("Operation failed");

        }

    };






    const handleEdit = (dept) => {


        setDepartment({

            departmentName: dept.departmentName,

            description: dept.description

        });


        setEditingId(
            dept.departmentId
        );


    };





    const handleDelete = async (id) => {


        if(
            window.confirm(
                "Delete this department?"
            )
        ) {

            try {

                await deleteDepartment(id);


                alert(
                    "Department deleted"
                );


                loadDepartments();

            }

            catch(error) {


                console.log(error);


                alert(
                    "Delete failed"
                );

            }

        }

    };





    return (

        <div className="department-container">


            <h1>
                Department Management
            </h1>



            <form onSubmit={handleSubmit}>


                <input

                    type="text"

                    name="departmentName"

                    placeholder="Department Name"

                    value={department.departmentName}

                    onChange={handleChange}

                    required

                />


                <textarea

                    name="description"

                    placeholder="Description"

                    value={department.description}

                    onChange={handleChange}

                />


                <button type="submit">


                    {
                        editingId
                        ?
                        "Update Department"
                        :
                        "Add Department"
                    }


                </button>


            </form>



            <hr />


            <h2>
                All Departments
            </h2>



            <table>


                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Description</th>

                        <th>Actions</th>

                    </tr>

                </thead>



                <tbody>


                {
                    departments.map((dept) => (


                        <tr key={dept.departmentId}>


                            <td>
                                {dept.departmentId}
                            </td>


                            <td>
                                {dept.departmentName}
                            </td>


                            <td>
                                {dept.description}
                            </td>


                            <td>


                                <button
                                    onClick={() => handleEdit(dept)}
                                >
                                    Edit
                                </button>


                                <button
                                    onClick={() =>
                                        handleDelete(
                                            dept.departmentId
                                        )
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


export default Department;