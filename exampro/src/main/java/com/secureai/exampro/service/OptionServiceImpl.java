package com.secureai.exampro.service;

import com.secureai.exampro.entity.Option;
import com.secureai.exampro.entity.Question;
import com.secureai.exampro.repository.OptionRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OptionServiceImpl implements OptionService {

    private final OptionRepository optionRepository;

    // Constructor Injection
    public OptionServiceImpl(OptionRepository optionRepository) {
        this.optionRepository = optionRepository;
    }

    // Create new option
    @Override
    public Option createOption(Option option) {

        return optionRepository.save(option);
    }

    // Get all options
    @Override
    public List<Option> getAllOptions() {

        return optionRepository.findAll();
    }

    @Override

    public List<Option> getOptionsByQuestionId(
        Long questionId) {

        return optionRepository
            .findByQuestionQuestionId(questionId);
} 

    // Get option by ID
    @Override
    public Option getOptionById(Long id) {

        return optionRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                        "Option not found with ID: " + id));
    }

    // Get all options of a question
    @Override
    public List<Option> getOptionsByQuestion(
            Question question) {

        return optionRepository.findByQuestion(question);
    }

    // Get correct option
    @Override
    public Option getCorrectOption(
            Question question) {

        return optionRepository
                .findByQuestionAndIsCorrectTrue(question)
                .orElseThrow(() ->
                        new RuntimeException(
                        "Correct option not found"));
    }

    // Get all correct options
    @Override
    public List<Option> getAllCorrectOptions() {

        return optionRepository.findByIsCorrectTrue();
    }

    // Get all incorrect options
    @Override
    public List<Option> getAllIncorrectOptions() {

        return optionRepository.findByIsCorrectFalse();
    }

    // Update option details
    @Override
    public Option updateOption(
            Long id,
            Option option) {

        Option existingOption = getOptionById(id);

        existingOption.setOptionText(
                option.getOptionText());

        existingOption.setIsCorrect(
                option.getIsCorrect());

        return optionRepository.save(existingOption);
    }

    // Delete option
    @Override
    public void deleteOption(Long id) {

        Option option = getOptionById(id);

        optionRepository.delete(option);
    }
}