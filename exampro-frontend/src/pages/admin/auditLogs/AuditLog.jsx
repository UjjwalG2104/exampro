import React, { useEffect, useState } from "react";

import {
    getAuditLogs,
    deleteAuditLog
} from "../../../api/api";

import "./AuditLog.css";


function AuditLog() {


    const [logs, setLogs] = useState([]);


    useEffect(() => {

        loadLogs();

    }, []);



    const loadLogs = async () => {


        try {


            const response = await getAuditLogs();


            setLogs(response.data);


        } catch (error) {


            console.log(error);


            alert("Failed to load audit logs");

        }

    };




    const handleDelete = async (id) => {


        const confirmDelete = window.confirm(
            "Delete this audit log?"
        );


        if (!confirmDelete) {

            return;

        }



        try {


            await deleteAuditLog(id);


            alert("Audit log deleted successfully");


            loadLogs();


        } catch (error) {


            console.log(error);


            alert("Delete failed");

        }

    };




    return (

        <div className="audit-container">


            <h1>
                Audit Log Management
            </h1>



            <table>


                <thead>

                    <tr>

                        <th>ID</th>

                        <th>User</th>

                        <th>Action</th>

                        <th>Entity</th>

                        <th>Old Value</th>

                        <th>New Value</th>

                        <th>Created At</th>

                        <th>Action</th>

                    </tr>

                </thead>



                <tbody>


                    {
                        logs.map((log) => (


                            <tr key={log.auditId}>


                                <td>
                                    {log.auditId}
                                </td>


                                <td>
                                    {
                                        log.user?.username
                                        || "Unknown"
                                    }
                                </td>


                                <td>
                                    {log.action}
                                </td>


                                <td>
                                    {log.entityName}
                                </td>


                                <td>
                                    {log.oldValue}
                                </td>


                                <td>
                                    {log.newValue}
                                </td>


                                <td>
                                    {log.createdAt}
                                </td>


                                <td>


                                    <button
                                        onClick={() =>
                                            handleDelete(log.auditId)
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


export default AuditLog;