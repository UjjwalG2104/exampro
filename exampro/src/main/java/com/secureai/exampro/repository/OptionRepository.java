package com.secureai.exampro.repository;

import com.secureai.exampro.entity.Option;
import com.secureai.exampro.entity.Question;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OptionRepository extends JpaRepository<Option, Long> {

    // Find all options for a question
    List<Option> findByQuestion(Question question);

    // Find the correct option for a question
    Optional<Option> findByQuestionAndIsCorrectTrue(Question question);

    // Get all correct options
    List<Option> findByIsCorrectTrue();

    List<Option> findByQuestionQuestionId(Long questionId);


    // Get all incorrect options
    List<Option> findByIsCorrectFalse();
}