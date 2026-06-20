import React, { useEffect, useState } from "react";
import {
    getUsers,
    createUser
} from "../../../api/api";

function Users() {

    const [users, setUsers] = useState([]);

    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        fullName: "",
        password: "",
        role: {
            roleId: 1
        }
    });


    // Load users when page opens
    useEffect(() => {
        loadUsers();
    }, []);


    // Get all users
    const loadUsers = async () => {

        try {

            const response = await getUsers();

            setUsers(response.data);

        } catch (error) {

            console.log("Error loading users:", error);

        }
    };


    // Input change handler
    const handleChange = (e) => {

        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });

    };


    // Add new user
    const addUser = async (e) => {

        e.preventDefault();

        try {

            await createUser(newUser);

            alert("User created successfully");

            setNewUser({
                username: "",
                email: "",
                fullName: "",
                password: "",
                role: {
                    roleId: 1
                }
            });

            loadUsers();

        } catch (error) {

            console.log("Error creating user:", error);

            alert("Failed to create user");
        }

    };


    return (

        <div style={{ padding: "20px" }}>

            <h1>User Management</h1>


            <h2>Add New User</h2>


            <form onSubmit={addUser}>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={handleChange}
                    required
                />

                <br />
                <br />


                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={handleChange}
                    required
                />

                <br />
                <br />


                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={newUser.fullName}
                    onChange={handleChange}
                    required
                />

                <br />
                <br />


                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={handleChange}
                    required
                />

                <br />
                <br />


                <button type="submit">
                    Add User
                </button>


            </form>


            <hr />


            <h2>All Users</h2>


            <table border="1" cellPadding="10">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Full Name</th>
                        <th>Role</th>
                    </tr>

                </thead>


                <tbody>

                    {users.length > 0 ? (

                        users.map((user) => (

                            <tr key={user.id}>

                                <td>{user.id}</td>

                                <td>{user.username}</td>

                                <td>{user.email}</td>

                                <td>{user.fullName}</td>

                                <td>
                                    {user.role?.roleName}
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td colSpan="5">
                                No users found
                            </td>

                        </tr>

                    )}

                </tbody>


            </table>


        </div>

    );
}


export default Users;