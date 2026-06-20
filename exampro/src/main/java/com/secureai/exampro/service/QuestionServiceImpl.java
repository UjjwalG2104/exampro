package com.secureai.exampro.service;

import com.secureai.exampro.entity.Question;
import com.secureai.exampro.entity.Faculty;
import com.secureai.exampro.entity.QuestionType;
import com.secureai.exampro.entity.DifficultyLevel;
import com.secureai.exampro.repository.QuestionRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;

    // Constructor Injection
    public QuestionServiceImpl(
            QuestionRepository questionRepository) {

        this.questionRepository = questionRepository;
    }

    // Create new question
    @Override
    public Question createQuestion(Question question) {

        return questionRepository.save(question);
    }

    // Get all questions
    @Override
    public List<Question> getAllQuestions() {

        return questionRepository.findAll();
    }

    // Get question by ID
    @Override
    public Question getQuestionById(Long id) {

        return questionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                        "Question not found with ID: " + id));
    }

    // Get questions by faculty
    @Override
    public List<Question> getQuestionsByFaculty(
            Faculty faculty) {

        return questionRepository.findByFaculty(
                faculty);
    }

    // Get questions by type
    @Override
    public List<Question> getQuestionsByType(
            QuestionType questionType) {

        return questionRepository.findByQuestionType(
                questionType);
    }

    // Get questions by difficulty
    @Override
    public List<Question> getQuestionsByDifficulty(
            DifficultyLevel difficultyLevel) {

        return questionRepository
                .findByDifficultyLevel(
                        difficultyLevel);
    }

    // Search questions by keyword
    @Override
    public List<Question> searchQuestions(
            String keyword) {

        return questionRepository
                .findByQuestionTextContainingIgnoreCase(
                        keyword);
    }

    // Generate random question set
    @Override
    public List<Question> generateRandomQuestions(
            Integer count) {

        return questionRepository
                .findRandomQuestions(count);
    }

    // Update question details
    @Override
    public Question updateQuestion(
            Long id,
            Question question) {

        Question existingQuestion = getQuestionById(id);

        existingQuestion.setQuestionText(
                question.getQuestionText());

        existingQuestion.setQuestionType(
                question.getQuestionType());

        existingQuestion.setDifficultyLevel(
                question.getDifficultyLevel());

        existingQuestion.setMarks(
                question.getMarks());

        return questionRepository.save(existingQuestion);
    }

    // Delete question
    @Override
    public void deleteQuestion(Long id) {

        Question question = getQuestionById(id);

        questionRepository.delete(question);
    }
}