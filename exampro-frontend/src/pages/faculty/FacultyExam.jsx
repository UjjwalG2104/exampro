import React, { useEffect, useState } from "react";
import {
    getExams,
    createExam,
    updateExam,
    deleteExam
} from "../../api/api";
import "./FacultyExam.css";

function FacultyExam() {

    const [exams, setExams] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        duration: ""
    });

    useEffect(() => {
        loadExams();
    }, []);

    const loadExams = async () => {

        try {

            const response = await getExams();

            console.log("EXAMS =>", response.data);

            setExams(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleEdit = (exam) => {

        setEditingId(exam.examId || exam.id);

        setFormData({
            title: exam.title || exam.examName || "",
            duration: exam.duration || ""
        });

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this exam?")) {
            return;
        }

        try {

            await deleteExam(id);

            alert("Exam deleted successfully");

            loadExams();

        } catch (error) {

            console.log(error);

            alert("Unable to delete exam");

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await updateExam(editingId, formData);

                alert("Exam updated successfully");

                setEditingId(null);

            } else {

                await createExam(formData);

                alert("Exam created successfully");

            }

            setFormData({
                title: "",
                duration: ""
            });

            loadExams();

        } catch (error) {

            alert("Unable to save exam");

            console.log(error);

        }

    };

    return (

        <div className="faculty-exam">

            <h1>My Exams</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    placeholder="Exam Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="duration"
                    placeholder="Duration (minutes)"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    {editingId ? "Update Exam" : "Create Exam"}
                </button>

            </form>

            <h2>Exam List</h2>

            <div className="exam-list">

                {
                    exams.map((exam, index) => (

                        <div
                            key={index}
                            className="exam-card"
                        >

                            <h3>
                                {exam.title || exam.examName || "Untitled Exam"}
                            </h3>

                            <p>
                                Duration: {exam.duration || 0} minutes
                            </p>

                            <div className="exam-actions">

                                <button
                                    onClick={() => handleEdit(exam)}
                                >
                                    ✏ Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(
                                            exam.examId || exam.id
                                        )
                                    }
                                >
                                    ❌ Delete
                                </button>

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>

    );

}

export default FacultyExam;