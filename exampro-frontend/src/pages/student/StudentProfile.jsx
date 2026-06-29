import React, { useEffect, useState } from "react";
import API from "../../api/api";

function StudentProfile() {

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const studentId = localStorage.getItem("studentId");

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const res = await API.get(`/students/${studentId}`);
            setStudent(res.data);
        } catch (error) {
            console.error(error);
            alert("Failed to load profile.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <h2 style={{ padding: "30px" }}>Loading Profile...</h2>;
    if (!student) return <h2 style={{ padding: "30px" }}>Profile not found.</h2>;

    return (
        <div style={{ padding: "30px", maxWidth: "500px" }}>

            <h1>👤 My Profile</h1>

            <div style={{
                background: "white",
                borderRadius: "12px",
                padding: "30px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                marginTop: "20px"
            }}>
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <div style={{
                        width: "80px", height: "80px",
                        borderRadius: "50%",
                        background: "#003366",
                        color: "white",
                        fontSize: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 10px"
                    }}>
                        {student.fullName?.charAt(0).toUpperCase()}
                    </div>
                    <h2 style={{ margin: 0 }}>{student.fullName}</h2>
                </div>

                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                        {[
                            ["🎓 Student ID", student.studentId],
                            ["📧 Email", student.email],
                            ["📱 Phone", student.phoneNumber || "N/A"],
                            ["🏫 Department", student.course?.department?.departmentName || "N/A"],
                            ["📚 Course", student.course?.courseName || "N/A"],
                            ["👤 Username", student.user?.username || "N/A"],
                        ].map(([label, value]) => (
                            <tr key={label} style={{ borderBottom: "1px solid #eee" }}>
                                <td style={{ padding: "12px 8px", color: "#555", fontWeight: "bold" }}>
                                    {label}
                                </td>
                                <td style={{ padding: "12px 8px", color: "#333" }}>
                                    {value}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default StudentProfile;