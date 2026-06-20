package com.secureai.exampro.repository;

import com.secureai.exampro.entity.ExamQuestion;
import com.secureai.exampro.entity.Exam;
import com.secureai.exampro.entity.Question;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExamQuestionRepository 
        extends JpaRepository<ExamQuestion, Long> {

    // Get all questions of a particular exam
    List<ExamQuestion> findByExamOrderByQuestionOrderAsc(
            Exam exam
    );

    // Check if a question already exists in an exam
    Optional<ExamQuestion> findByExamAndQuestion(
            Exam exam,
            Question question
    );

    // Check duplicate question
    boolean existsByExamAndQuestion(
            Exam exam,
            Question question
    );

    // Count total questions in an exam
    long countByExam(Exam exam);
}