import React, { useEffect, useState } from "react";

import {
    getWebcamLogs,
    deleteWebcamLog
} from "../../../api/api";

import "./WebcamLog.css";


function WebcamLog() {

    const [logs, setLogs] = useState([]);


    useEffect(() => {

        loadLogs();

    }, []);



    const loadLogs = async () => {

        try {

            const response = await getWebcamLogs();

            setLogs(response.data);

        }
        catch(error) {

            console.log(error);

            alert("Failed to load webcam logs");

        }

    };



    const handleDelete = async(id) => {


        if(window.confirm(
            "Delete this webcam log?"
        )) {


            try {


                await deleteWebcamLog(id);


                alert("Webcam log deleted");


                loadLogs();


            }
            catch(error) {


                console.log(error);


                alert("Delete failed");

            }


        }

    };



    return (

        <div className="webcam-container">


            <h1>
                Webcam Log Management
            </h1>


            <table>


                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Session</th>
                        <th>Student</th>
                        <th>Image</th>
                        <th>Detection</th>
                        <th>Confidence</th>
                        <th>Created At</th>
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
                            {log.session?.student?.fullName}
                        </td>


                        <td>

                            {
                                log.imageUrl ?

                                <img
                                    src={log.imageUrl}
                                    alt="Webcam"
                                    width="100"
                                    height="80"
                                />

                                :

                                "No Image"

                            }

                        </td>


                        <td>
                            {log.detectionType}
                        </td>


                        <td>
                            {log.confidence}
                        </td>


                        <td>
                            {log.createdAt}
                        </td>


                        <td>


                            <button
                                onClick={() =>
                                    handleDelete(log.logId)
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


export default WebcamLog;