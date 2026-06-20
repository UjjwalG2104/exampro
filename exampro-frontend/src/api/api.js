import axios from "axios";


const API = axios.create({
    baseURL: "http://localhost:8080/api",
});


// ================= AUTH MANAGEMENT =================

// Save login information
export const setAuthData = (data) => {

    localStorage.setItem(
        "token",
        data.token
    );

    localStorage.setItem(
        "role",
        data.role
    );

    localStorage.setItem(
        "username",
        data.username
    );

};


// Clear login information
export const clearAuthData = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    localStorage.removeItem("username");

};


// ================= JWT REQUEST INTERCEPTOR =================

API.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {

        config.headers.Authorization =
            `Bearer ${token}`;

    }

    return config;

});


// ================= 401 RESPONSE INTERCEPTOR =================

API.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            clearAuthData();

            window.location.href = "/login";

        }

        return Promise.reject(error);

    }

);
// ================= USERS API =================

// Get all users
export const getUsers = () =>
    API.get("/users");


// Get user by ID
export const getUserById = (id) =>
    API.get(`/users/${id}`);


// Create user
export const createUser = (user) =>
    API.post("/users", user);


// Update user
export const updateUser = (id, user) =>
    API.put(`/users/${id}`, user);


// Delete user
export const deleteUser = (id) =>
    API.delete(`/users/${id}`);



// ================= DEPARTMENT API =================


// Get all departments
export const getDepartments = () =>
    API.get("/departments");


// Create department
export const createDepartment = (department) =>
    API.post("/departments", department);


// Update department
export const updateDepartment = (id, department) =>
    API.put(`/departments/${id}`, department);


// Delete department
export const deleteDepartment = (id) =>
    API.delete(`/departments/${id}`);


// ================= COURSE API =================


// Get all courses
export const getCourses = () =>
    API.get("/courses");


// Create course
export const createCourse = (course) =>
    API.post("/courses", course);


// Update course
export const updateCourse = (id, course) =>
    API.put(`/courses/${id}`, course);


// Delete course
export const deleteCourse = (id) =>
    API.delete(`/courses/${id}`);


// ================= FACULTY API =================


// Get all faculties
export const getFaculties = () =>
    API.get("/faculties");


// Get faculty by ID
export const getFacultyById = (id) =>
    API.get(`/faculties/${id}`);


// Create faculty
export const createFaculty = (faculty) =>
    API.post("/faculties", faculty);


// Update faculty
export const updateFaculty = (id, faculty) =>
    API.put(`/faculties/${id}`, faculty);


// Delete faculty
export const deleteFaculty = (id) =>
    API.delete(`/faculties/${id}`);


// ================= STUDENT API =================


// Get all students
export const getStudents = () =>
    API.get("/students");


// Get student by ID
export const getStudentById = (id) =>
    API.get(`/students/${id}`);


// Create student
export const createStudent = (student) =>
    API.post("/students", student);


// Update student
export const updateStudent = (id, student) =>
    API.put(`/students/${id}`, student);


// Delete student
export const deleteStudent = (id) =>
    API.delete(`/students/${id}`);


// ================= EXAM API =================


// Get all exams
export const getExams = () =>
    API.get("/exams");


// Get exam by ID
export const getExamById = (id) =>
    API.get(`/exams/${id}`);


// Create exam
export const createExam = (exam) =>
    API.post("/exams", exam);


// Update exam
export const updateExam = (id, exam) =>
    API.put(`/exams/${id}`, exam);


// Delete exam
export const deleteExam = (id) =>
    API.delete(`/exams/${id}`);

// ================= QUESTION API =================


// Get all questions
export const getQuestions = () =>
    API.get("/questions");


// Get question by ID
export const getQuestionById = (id) =>
    API.get(`/questions/${id}`);


// Create question
export const createQuestion = (question) =>
    API.post("/questions", question);


// Update question
export const updateQuestion = (id, question) =>
    API.put(`/questions/${id}`, question);


// Delete question
export const deleteQuestion = (id) =>
    API.delete(`/questions/${id}`);

// ================= OPTION API =================


// Get all options
export const getOptions = () =>
    API.get("/options");


// Get option by ID
export const getOptionById = (id) =>
    API.get(`/options/${id}`);


// Create option
export const createOption = (option) =>
    API.post("/options", option);


// Update option
export const updateOption = (id, option) =>
    API.put(`/options/${id}`, option);


// Delete option
export const deleteOption = (id) =>
    API.delete(`/options/${id}`);



// ================= EXAM QUESTION API =================


// Get all exam questions
export const getExamQuestions = () =>
    API.get("/exam-questions");


// Get exam question by ID
export const getExamQuestionById = (id) =>
    API.get(`/exam-questions/${id}`);


// Create exam question
export const createExamQuestion = (data) =>
    API.post("/exam-questions", data);


// Update exam question
export const updateExamQuestion = (id, data) =>
    API.put(`/exam-questions/${id}`, data);


// Delete exam question
export const deleteExamQuestion = (id) =>
    API.delete(`/exam-questions/${id}`);



// ================= EXAM SESSION API =================


// Get all exam sessions
export const getExamSessions = () =>
    API.get("/exam-sessions");


// Get exam session by ID
export const getExamSessionById = (id) =>
    API.get(`/exam-sessions/${id}`);


// Create exam session
export const createExamSession = (session) =>
    API.post("/exam-sessions", session);


// Complete exam session
export const completeExamSession = (id) =>
    API.put(`/exam-sessions/${id}/complete`);


// Terminate exam session
export const terminateExamSession = (id) =>
    API.put(`/exam-sessions/${id}/terminate`);


// Delete exam session
export const deleteExamSession = (id) =>
    API.delete(`/exam-sessions/${id}`);


// ================= STUDENT ANSWER API =================


// Get all student answers
export const getStudentAnswers = () =>
    API.get("/student-answers");


// Get answer by ID
export const getStudentAnswerById = (id) =>
    API.get(`/student-answers/${id}`);


// Create answer
export const createStudentAnswer = (answer) =>
    API.post("/student-answers", answer);


// Update answer
export const updateStudentAnswer = (id, answer) =>
    API.put(`/student-answers/${id}`, answer);


// Delete answer
export const deleteStudentAnswer = (id) =>
    API.delete(`/student-answers/${id}`);


// ================= NOTIFICATION API =================


// Get all notifications
export const getNotifications = () =>
    API.get("/notifications");


// Get notification by ID
export const getNotificationById = (id) =>
    API.get(`/notifications/${id}`);


// Create notification
export const createNotification = (notification) =>
    API.post("/notifications", notification);


// Mark notification as read
export const markNotificationRead = (id) =>
    API.put(`/notifications/${id}/read`);


// Delete notification
export const deleteNotification = (id) =>
    API.delete(`/notifications/${id}`);


// ================= RESULT API =================


// Get all results
export const getResults = () =>
    API.get("/results");


// Get result by ID
export const getResultById = (id) =>
    API.get(`/results/${id}`);


// Create result
export const createResult = (result) =>
    API.post("/results", result);


// Update result
export const updateResult = (id, result) =>
    API.put(`/results/${id}`, result);


// Delete result
export const deleteResult = (id) =>
    API.delete(`/results/${id}`);


// ================= SECURITY LOG API =================


// Get all security logs
export const getSecurityLogs = () =>
    API.get("/security-logs");


// Get security log by ID
export const getSecurityLogById = (id) =>
    API.get(`/security-logs/${id}`);


// Delete security log
export const deleteSecurityLog = (id) =>
    API.delete(`/security-logs/${id}`);


// ================= AUDIT LOG API =================


// Get all audit logs
export const getAuditLogs = () =>
    API.get("/audit-logs");


// Get audit log by ID
export const getAuditLogById = (id) =>
    API.get(`/audit-logs/${id}`);


// Delete audit log
export const deleteAuditLog = (id) =>
    API.delete(`/audit-logs/${id}`);


// ================= WEBCAM LOG API =================


// Get all webcam logs
export const getWebcamLogs = () =>
    API.get("/webcam-logs");


// Get webcam log by ID
export const getWebcamLogById = (id) =>
    API.get(`/webcam-logs/${id}`);


// Delete webcam log
export const deleteWebcamLog = (id) =>
    API.delete(`/webcam-logs/${id}`);

// Get questions by exam
export const getExamQuestionsByExamId = (examId) =>
    API.get(`/exam-questions/exam/${examId}`);

export default API;