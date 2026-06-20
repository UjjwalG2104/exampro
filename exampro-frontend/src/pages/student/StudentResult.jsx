import React from "react";
import "./StudentResult.css";


function StudentResult() {

    return (

        <div className="student-result">

            <h1>
                📊 My Results
            </h1>


            <div className="result-card">

                <h3>
                    Java Programming Exam
                </h3>

                <p>
                    Score: 85 / 100
                </p>

                <p>
                    Status: PASS ✅
                </p>

            </div>

        </div>

    );

}


export default StudentResult;