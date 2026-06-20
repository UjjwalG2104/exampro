package com.secureai.exampro.repository;

import com.secureai.exampro.entity.ExamSession;
import com.secureai.exampro.entity.Exam;
import com.secureai.exampro.entity.Student;
import com.secureai.exampro.entity.SessionStatus;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExamSessionRepository 
        extends JpaRepository<ExamSession, Long> {

    // Find all sessions of a student
    List<ExamSession> findByStudent(Student student);

    // Find all sessions of an exam
    List<ExamSession> findByExam(Exam exam);

    // Find a student's specific exam session
    Optional<ExamSession> findByStudentAndExam(
            Student student,
            Exam exam
    );

    // Find sessions by status
    List<ExamSession> findBySessionStatus(
            SessionStatus sessionStatus
    );

    // Find active exam session
    Optional<ExamSession> findByStudentAndExamAndSessionStatus(
            Student student,
            Exam exam,
            SessionStatus sessionStatus
    );

    // Count completed exams
    long countBySessionStatus(
            SessionStatus sessionStatus
    );
}