package com.secureai.exampro.service;

import com.secureai.exampro.entity.Exam;
import com.secureai.exampro.entity.ExamQuestion;
import com.secureai.exampro.entity.Question;

import java.util.List;

public interface ExamQuestionService {

    // Add question to exam
    ExamQuestion addQuestionToExam(
            ExamQuestion examQuestion
    );

    // Get all questions of an exam
    List<ExamQuestion> getQuestionsByExam(
            Exam exam
    );

    // Get all questions using examId
    List<ExamQuestion> getQuestionsByExamId(
            Long examId
    );

    // Get all exam-question mappings
    List<ExamQuestion> getAllExamQuestions();

    // Get exam-question by ID
    ExamQuestion getExamQuestionById(
            Long id
    );

    // Check duplicate question
    boolean existsQuestionInExam(
            Exam exam,
            Question question
    );

    // Update question order and marks
    ExamQuestion updateExamQuestion(
            Long id,
            ExamQuestion examQuestion
    );

    // Delete mapping
    void removeQuestionFromExam(
            Long id
    );

    // Count questions in exam
    long countQuestionsInExam(
            Exam exam
    );
}