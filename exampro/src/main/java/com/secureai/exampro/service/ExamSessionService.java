package com.secureai.exampro.service;

import com.secureai.exampro.entity.Exam;
import com.secureai.exampro.entity.ExamSession;
import com.secureai.exampro.entity.Student;
import com.secureai.exampro.entity.SessionStatus;

import java.util.List;

public interface ExamSessionService {

    // Start a new exam session
    ExamSession startExam(
            ExamSession examSession
    );

    // Get all exam sessions
    List<ExamSession> getAllSessions();

    // Get session by ID
    ExamSession getSessionById(
            Long id
    );

    // Get all sessions of a student
    List<ExamSession> getSessionsByStudent(
            Student student
    );

    // Get all sessions of an exam
    List<ExamSession> getSessionsByExam(
            Exam exam
    );

    // Get specific student's exam session
    ExamSession getStudentExamSession(
            Student student,
            Exam exam
    );

    // Get sessions by status
    List<ExamSession> getSessionsByStatus(
            SessionStatus status
    );

    // Check whether student has active exam
    ExamSession getActiveSession(
            Student student,
            Exam exam,
            SessionStatus status
    );

    // Complete exam
    ExamSession completeExam(
            Long sessionId
    );

    // Terminate exam due to cheating
    ExamSession terminateExam(
            Long sessionId
    );

    // Delete exam session
    void deleteSession(
            Long id
    );

    // Count sessions by status
    long countSessionsByStatus(
            SessionStatus status
    );
}