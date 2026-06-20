package com.secureai.exampro.service;

import com.secureai.exampro.entity.Exam;
import com.secureai.exampro.entity.ExamSession;
import com.secureai.exampro.entity.Student;
import com.secureai.exampro.entity.SessionStatus;
import com.secureai.exampro.repository.ExamSessionRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamSessionServiceImpl implements ExamSessionService {

    private final ExamSessionRepository examSessionRepository;

    // Constructor Injection
    public ExamSessionServiceImpl(
            ExamSessionRepository examSessionRepository) {

        this.examSessionRepository = examSessionRepository;
    }

    // Start exam session
    @Override
    public ExamSession startExam(ExamSession examSession) {

        Student student = examSession.getStudent();
        Exam exam = examSession.getExam();

        if (examSessionRepository
                .findByStudentAndExam(student, exam)
                .isPresent()) {

            throw new RuntimeException(
                    "Student has already started this exam!");
        }

        examSession.setSessionStatus(SessionStatus.STARTED);

        return examSessionRepository.save(examSession);
    }

    // Get all sessions
    @Override
    public List<ExamSession> getAllSessions() {

        return examSessionRepository.findAll();
    }

    // Get session by ID
    @Override
    public ExamSession getSessionById(Long id) {

        return examSessionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                        "Exam session not found with ID: " + id));
    }

    // Get sessions of a student
    @Override
    public List<ExamSession> getSessionsByStudent(
            Student student) {

        return examSessionRepository.findByStudent(student);
    }

    // Get sessions of an exam
    @Override
    public List<ExamSession> getSessionsByExam(
            Exam exam) {

        return examSessionRepository.findByExam(exam);
    }

    // Get student's exam session
    @Override
    public ExamSession getStudentExamSession(
            Student student,
            Exam exam) {

        return examSessionRepository
                .findByStudentAndExam(student, exam)
                .orElseThrow(() ->
                        new RuntimeException(
                        "Exam session not found"));
    }

    // Get sessions by status
    @Override
    public List<ExamSession> getSessionsByStatus(
            SessionStatus status) {

        return examSessionRepository
                .findBySessionStatus(status);
    }

    // Get active session
    @Override
    public ExamSession getActiveSession(
            Student student,
            Exam exam,
            SessionStatus status) {

        return examSessionRepository
                .findByStudentAndExamAndSessionStatus(
                        student, exam, status)
                .orElseThrow(() ->
                        new RuntimeException(
                        "No active exam session found"));
    }

    // Complete exam
    @Override
    public ExamSession completeExam(Long sessionId) {

        ExamSession session = getSessionById(sessionId);

        session.setSessionStatus(SessionStatus.COMPLETED);

        return examSessionRepository.save(session);
    }

    // Terminate exam due to violations
    @Override
    public ExamSession terminateExam(Long sessionId) {

        ExamSession session = getSessionById(sessionId);

        session.setSessionStatus(SessionStatus.TERMINATED);

        return examSessionRepository.save(session);
    }

    // Delete exam session
    @Override
    public void deleteSession(Long id) {

        ExamSession session = getSessionById(id);

        examSessionRepository.delete(session);
    }

    // Count sessions by status
    @Override
    public long countSessionsByStatus(
            SessionStatus status) {

        return examSessionRepository
                .countBySessionStatus(status);
    }
}