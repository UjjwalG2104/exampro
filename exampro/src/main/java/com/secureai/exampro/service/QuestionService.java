package com.secureai.exampro.service;

import com.secureai.exampro.entity.Question;
import com.secureai.exampro.entity.Faculty;
import com.secureai.exampro.entity.QuestionType;
import com.secureai.exampro.entity.DifficultyLevel;

import java.util.List;

public interface QuestionService {

    // Create a new question
    Question createQuestion(Question question);

    // Get all questions
    List<Question> getAllQuestions();

    // Get question by ID
    Question getQuestionById(Long id);

    // Get questions created by faculty
    List<Question> getQuestionsByFaculty(Faculty faculty);

    // Get questions by type
    List<Question> getQuestionsByType(QuestionType questionType);

    // Get questions by difficulty level
    List<Question> getQuestionsByDifficulty(
            DifficultyLevel difficultyLevel
    );

    // Search questions by keyword
    List<Question> searchQuestions(String keyword);

    // Generate random question set
    List<Question> generateRandomQuestions(Integer count);

    // Update question details
    Question updateQuestion(Long id, Question question);

    // Delete question
    void deleteQuestion(Long id);
}
