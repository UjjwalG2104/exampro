import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/users/Users";
import Department from "./pages/admin/departments/Department";
import Course from "./pages/admin/courses/Course";
import Faculty from "./pages/admin/faculties/Faculty";
import Student from "./pages/admin/students/Student";
import Exam from "./pages/admin/exams/Exam";
import Question from "./pages/admin/questions/Question";
import Option from "./pages/admin/options/Option";
import ExamQuestion from "./pages/admin/examQuestions/ExamQuestion";
import ExamSession from "./pages/admin/examSessions/ExamSession";
import StudentAnswer from "./pages/admin/studentAnswers/StudentAnswer";
import Result from "./pages/admin/results/Result";
import StudentExamPage from "./pages/student/StudentExamPage";
import Notification from "./pages/admin/Notification/Notification";
import SecurityLog from "./pages/admin/securityLogs/SecurityLog";
import AuditLog from "./pages/admin/auditLogs/AuditLog";
import WebcamLog from "./pages/admin/webcamLogs/WebcamLog";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentExam from "./pages/student/StudentExam";
import StudentResult from "./pages/student/StudentResult";
import StudentProfile from "./pages/student/StudentProfile";
import FacultyExam from "./pages/faculty/FacultyExam";


function App() {

    return (

        <BrowserRouter>

            <Routes>


                {/* Default Route */}
                <Route
                    path="/"
                    element={<Navigate to="/login" />}
                />


                {/* Login Route */}
                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* Admin Dashboard */}
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute role="ADMIN">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />


                {/* User Management */}
                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute role="ADMIN">
                            <Users />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/faculty/dashboard"
    
                    element={
                        <ProtectedRoute role="FACULTY">
                            <FacultyDashboard />
                        </ProtectedRoute>
                    }
                />  
                {/* Faculty Exam Management */}
                <Route  
                    path="/faculty/exams"
                    element={
                        <ProtectedRoute role="FACULTY">
                            <FacultyExam />
                        </ProtectedRoute>
                    }
                />  


                  {/* Faculty Question Management */} 
                <Route
                    path="/faculty/questions"
                    element={
                        <ProtectedRoute role="FACULTY">
                            <Question />
                        </ProtectedRoute>
                    }
   
              />  


                {/* Faculty MCQ Options */}
                <Route
                    path="/faculty/options"
                    element=
                    {
                        <ProtectedRoute role="FACULTY">
                            <Option />
                        </ProtectedRoute>
                    }
              />


                {/* Faculty Results */} 
                <Route
                    path="/faculty/results"
                    element={
                        <ProtectedRoute role="FACULTY">
                            <Result />
                        </ProtectedRoute>
                    }
                />  
        


                {/* Faculty Exam Sessions */}
                <Route
                    path="/faculty/exam-sessions"
                    element={ 
                        <ProtectedRoute role="FACULTY">
                            <ExamSession />
                        </ProtectedRoute>
                    }
   
              />  


                {/* Department Management */}
                <Route
                    path="/admin/departments"
                    element={
                        <ProtectedRoute role="ADMIN">
                            <Department />
                        </ProtectedRoute>
                    }
                />


                {/* Course Management */}
                <Route
                    path="/admin/courses"
                    element={
                        <ProtectedRoute role="ADMIN">
                            <Course />
                        </ProtectedRoute>
                    }

                />
                 {/* Student Dashboard */}
                <Route
                    path="/student/dashboard"
                    element={
                      <ProtectedRoute role="STUDENT">
                          <StudentDashboard />
                           </ProtectedRoute>
                    }
                />         
          
                {/* Student Exam */}
                <Route
                    path="/student/exams"
                    element={
                        <ProtectedRoute role="STUDENT">
                            <StudentExam />
                        </ProtectedRoute>
                    }
                />
        
                {/* Student Results */}
                <Route
                    path="/student/results"
                    element={
                         <ProtectedRoute role="STUDENT">
                            <StudentResult />
                        </ProtectedRoute>
                    }
                />

                {/* Student Profile */}
                <Route
                    path="/student/profile"
                    element={
                        <ProtectedRoute role="STUDENT">
                            <StudentProfile />
                        </ProtectedRoute>
                    }
                />
        

                {/* Faculty Management */}
                <Route
                    path="/admin/faculties"
                    element={
                        <ProtectedRoute role="ADMIN">
                            <Faculty />
                        </ProtectedRoute>
                    }
                />


                {/* Student Management */}
                <Route
                    path="/admin/students"
                    element={
                        <ProtectedRoute role="ADMIN">
                            <Student />
                        </ProtectedRoute>
                    }
                />


                {/* Exam Management */}
                <Route
                    path="/admin/exams"
                    element={
                        <ProtectedRoute role="ADMIN">
                            <Exam />
                        </ProtectedRoute>
                    }
                />


                {/* Question Management */}
                <Route
                    path="/admin/questions"
                    element={
                        <ProtectedRoute role="ADMIN">
                            <Question />
                        </ProtectedRoute>
                    }
                />


                {/* MCQ Options */}
                <Route
                    path="/admin/options"
                    element={
                        <ProtectedRoute role="ADMIN">
                            <Option />
                        </ProtectedRoute>
                    }
                />


                {/* Exam Question Mapping */}
                <Route
                    path="/admin/exam-questions"
                    element={
                        <ProtectedRoute role="ADMIN">
                            <ExamQuestion />
                        </ProtectedRoute>
                    }
                />


                {/* Exam Sessions */}
                <Route
                    path="/admin/exam-sessions"
                    element={
                        <ProtectedRoute role="ADMIN">
                            <ExamSession />
                        </ProtectedRoute>
                    }
                />


                {/* Student Answers */}
                <Route
                    path="/admin/student-answers"
                    element={
                        <ProtectedRoute role="ADMIN">
                            <StudentAnswer />
                        </ProtectedRoute>
                    }
                />


                {/* Results */}
                <Route
                    path="/admin/results"
                    element={
                        <ProtectedRoute role="ADMIN">
                            <Result />
                        </ProtectedRoute>
                    }
                />


                {/* Notifications */}
                <Route
                    path="/admin/notifications"
                    element={
                        <ProtectedRoute role="ADMIN">
                            <Notification />
                        </ProtectedRoute>
                    }
                />


                {/* Security Logs */}
                <Route
                    path="/admin/security-logs"
                    element={
                        <ProtectedRoute role="ADMIN">
                            <SecurityLog />
                        </ProtectedRoute>
                    }
                />


                {/* Audit Logs */}
                <Route
                    path="/admin/audit-logs"
                    element={
                        <ProtectedRoute role="ADMIN">
                            <AuditLog />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/exam-page/:examId"
                    element={
                        <ProtectedRoute role="STUDENT">
                            <StudentExamPage />
                        </ProtectedRoute>
                    }
                />
                




                {/* Webcam Logs */}
                <Route
                    path="/admin/webcam-logs"
                    element={
                        <ProtectedRoute role="ADMIN">
                            <WebcamLog />
                        </ProtectedRoute>
                    }
                />


                {/* Invalid URL Redirect */}
                <Route
                    path="*"
                    element={<Navigate to="/login" />}
                />


            </Routes>

        </BrowserRouter>

    );

}


export default App;