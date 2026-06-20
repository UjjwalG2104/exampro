package com.secureai.exampro.service;

import com.secureai.exampro.entity.StudentAnswer;
import com.secureai.exampro.entity.ExamSession;
import com.secureai.exampro.entity.Question;

import java.util.List;

public interface StudentAnswerService {

    // Submit a student answer
    StudentAnswer submitAnswer(
            StudentAnswer studentAnswer
    );

    // Get all answers
    List<StudentAnswer> getAllAnswers();

    // Get answer by ID
    StudentAnswer getAnswerById(
            Long id
    );

    // Get all answers of an exam session
    List<StudentAnswer> getAnswersBySession(
            ExamSession session
    );

    // Get a specific answer of a question
    StudentAnswer getAnswerByQuestion(
            ExamSession session,
            Question question
    );

    // Check if a question is already answered
    boolean isQuestionAnswered(
            ExamSession session,
            Question question
    );

    // Update an existing answer
    StudentAnswer updateAnswer(
            Long id,
            StudentAnswer studentAnswer
    );

    // Delete an answer
    void deleteAnswer(
            Long id
    );

    // Count submitted answers in a session
    long countAnswers(
            ExamSession session
    );
}