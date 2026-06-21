package com.secureai.exampro.service;

import com.secureai.exampro.entity.Option;
import com.secureai.exampro.entity.Question;

import java.util.List;

public interface OptionService {

    // Add a new option
    Option createOption(Option option);

    // Get all options
    List<Option> getAllOptions();

    // Get option by ID
    Option getOptionById(Long id);

    List<Option> getOptionsByQuestionId(Long questionId);


    


    // Get all options of a question
    List<Option> getOptionsByQuestion(Question question);

    // Get correct option of a question
    Option getCorrectOption(Question question);

    // Get all correct options
    List<Option> getAllCorrectOptions();

    // Get all incorrect options
    List<Option> getAllIncorrectOptions();

    // Update option details
    Option updateOption(Long id, Option option);

    // Delete option
    void deleteOption(Long id);
}