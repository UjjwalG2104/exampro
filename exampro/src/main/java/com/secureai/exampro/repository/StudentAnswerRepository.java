package com.secureai.exampro.repository;

import com.secureai.exampro.entity.StudentAnswer;
import com.secureai.exampro.entity.ExamSession;
import com.secureai.exampro.entity.Question;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentAnswerRepository
        extends JpaRepository<StudentAnswer, Long> {

    // Get all answers of an exam session
    List<StudentAnswer> findBySession(
            ExamSession session
    );

    // Find answer of a specific question in a session
    Optional<StudentAnswer> findBySessionAndQuestion(
            ExamSession session,
            Question question
    );

    // Check whether question already answered
    boolean existsBySessionAndQuestion(
            ExamSession session,
            Question question
    );

    // Count total answers submitted in a session
    long countBySession(
            ExamSession session
    );
}