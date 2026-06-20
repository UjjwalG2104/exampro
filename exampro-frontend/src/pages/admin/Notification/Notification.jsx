import React, { useEffect, useState } from "react";

import {
    getNotifications,
    createNotification,
    deleteNotification,
    markNotificationRead,
    getUsers
} from "../../../api/api";

import "./Notification.css";


function Notification() {

    const [notifications, setNotifications] = useState([]);
    const [users, setUsers] = useState([]);

    const [notification, setNotification] = useState({
        user: {
            id: ""
        },
        title: "",
        message: ""
    });


    useEffect(() => {
        loadNotifications();
        loadUsers();
    }, []);


    // Load all notifications
    const loadNotifications = async () => {
        try {
            const response = await getNotifications();
            setNotifications(response.data);
        } catch (error) {
            console.error("Error loading notifications:", error);
            alert("Unable to load notifications");
        }
    };


    // Load users
    const loadUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.data);
        } catch (error) {
            console.error("Error loading users:", error);
        }
    };


    // Handle input changes
    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "userId") {

            setNotification({
                ...notification,
                user: {
                    id: Number(value)
                }
            });

        } else {

            setNotification({
                ...notification,
                [name]: value
            });

        }
    };


    // Create notification
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createNotification(notification);

            alert("Notification sent successfully");

            resetForm();

            loadNotifications();

        } catch (error) {

            console.error("Create error:", error);

            alert("Failed to create notification");
        }
    };


    // Mark notification as read
    const handleMarkRead = async (id) => {

        try {

            await markNotificationRead(id);

            alert("Notification marked as read");

            loadNotifications();

        } catch (error) {

            console.error("Mark read error:", error);
        }
    };


    // Delete notification
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this notification?"
        );

        if (!confirmDelete) return;


        try {

            await deleteNotification(id);

            alert("Notification deleted");

            loadNotifications();

        } catch (error) {

            console.error("Delete error:", error);

            alert("Failed to delete notification");
        }
    };


    // Reset form
    const resetForm = () => {

        setNotification({
            user: {
                id: ""
            },
            title: "",
            message: ""
        });

    };


    return (

        <div className="notification-container">

            <h1>
                Notification Management
            </h1>


            <form onSubmit={handleSubmit}>

                <select
                    name="userId"
                    value={notification.user.id}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select User
                    </option>

                    {
                        users.map((user) => (

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
                    type="text"
                    name="title"
                    placeholder="Enter notification title"
                    value={notification.title}
                    onChange={handleChange}
                    required
                />


                <textarea
                    name="message"
                    placeholder="Enter notification message"
                    value={notification.message}
                    onChange={handleChange}
                    required
                />


                <button type="submit">
                    Send Notification
                </button>

            </form>


            <hr />


            <h2>
                All Notifications
            </h2>


            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Title</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>

                </thead>


                <tbody>

                    {
                        notifications.map((item) => (

                            <tr key={item.notificationId}>

                                <td>
                                    {item.notificationId}
                                </td>

                                <td>
                                    {item.user?.username}
                                </td>

                                <td>
                                    {item.title}
                                </td>

                                <td>
                                    {item.message}
                                </td>

                                <td>
                                    {
                                        item.read
                                            ? "✅ Read"
                                            : "🔔 Unread"
                                    }
                                </td>

                                <td>

                                    <button
                                        onClick={() =>
                                            handleMarkRead(
                                                item.notificationId
                                            )
                                        }
                                    >
                                        Mark Read
                                    </button>


                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                item.notificationId
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


export default Notification;