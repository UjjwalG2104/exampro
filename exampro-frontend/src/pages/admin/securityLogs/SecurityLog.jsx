import React, { useEffect, useState } from "react";

import {
    getSecurityLogs,
    deleteSecurityLog
} from "../../../api/api";

import "./SecurityLog.css";


function SecurityLog() {

    const [logs, setLogs] = useState([]);


    useEffect(() => {
        loadLogs();
    }, []);


    const loadLogs = async () => {

        try {

            const response = await getSecurityLogs();

            setLogs(response.data);

        } catch(error) {

            console.log(error);

            alert("Failed to load security logs");

        }

    };


    const handleDelete = async(id) => {

        const confirmDelete = window.confirm(
            "Delete this security log?"
        );

        if(!confirmDelete) return;


        try {

            await deleteSecurityLog(id);

            alert("Security log deleted");

            loadLogs();

        } catch(error) {

            console.log(error);

            alert("Delete failed");

        }

    };


    return (

        <div className="security-container">

            <h1>
                Security Log Management
            </h1>


            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Session ID</th>
                        <th>Event Type</th>
                        <th>Warning</th>
                        <th>Description</th>
                        <th>IP Address</th>
                        <th>Browser</th>
                        <th>Created Time</th>
                        <th>Action</th>
                    </tr>

                </thead>


                <tbody>

                    {
                        logs.map(log => (

                            <tr key={log.logId}>

                                <td>
                                    {log.logId}
                                </td>


                                <td>
                                    {log.session?.sessionId}
                                </td>


                                <td>
                                    {log.eventType}
                                </td>


                                <td>
                                    {log.warningNumber}
                                </td>


                                <td>
                                    {log.eventDescription}
                                </td>


                                <td>
                                    {log.ipAddress}
                                </td>


                                <td>
                                    {log.browserInformation}
                                </td>


                                <td>
                                    {
                                        log.createdAt
                                    }
                                </td>


                                <td>

                                    <button
                                        onClick={() =>
                                        handleDelete(log.logId)}
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


export default SecurityLog;