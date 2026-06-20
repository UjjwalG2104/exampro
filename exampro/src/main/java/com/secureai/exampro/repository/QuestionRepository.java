package com.secureai.exampro.repository;

import com.secureai.exampro.entity.Question;
import com.secureai.exampro.entity.Faculty;
import com.secureai.exampro.entity.QuestionType;
import com.secureai.exampro.entity.DifficultyLevel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    // Find all questions created by a faculty
    List<Question> findByFaculty(Faculty faculty);

    // Find questions by type (MCQ, TRUE_FALSE, SHORT_ANSWER)
    List<Question> findByQuestionType(QuestionType questionType);

    // Find questions by difficulty level
    List<Question> findByDifficultyLevel(
        DifficultyLevel difficultyLevel
    );

    // Search questions by keyword
    List<Question> findByQuestionTextContainingIgnoreCase(
        String keyword
    );

    // Get random questions for automatic exam generation
    @Query(
        value = "SELECT * FROM questions ORDER BY RAND() LIMIT ?1",
        nativeQuery = true
    )
    List<Question> findRandomQuestions(Integer limit);
}