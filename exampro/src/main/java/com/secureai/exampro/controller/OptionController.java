package com.secureai.exampro.controller;

import com.secureai.exampro.entity.Option;
import com.secureai.exampro.service.OptionService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/options")
@CrossOrigin(origins = "http://localhost:3000")
public class OptionController {

    private final OptionService optionService;

    public OptionController(OptionService optionService) {
        this.optionService = optionService;
    }

    // Create Option
    @PostMapping
    public ResponseEntity<Option> createOption(
            @RequestBody Option option) {
        return ResponseEntity.ok(optionService.createOption(option));
    }

    // Get All Options
    @GetMapping
    public ResponseEntity<List<Option>> getAllOptions() {
        return ResponseEntity.ok(optionService.getAllOptions());
    }

    // Get Options by Question ID
    @GetMapping("/question/{questionId}")
    public ResponseEntity<List<Option>> getOptionsByQuestionId(
            @PathVariable Long questionId) {
        return ResponseEntity.ok(
                optionService.getOptionsByQuestionId(questionId));
    }

    // Get Option By ID
    @GetMapping("/{id}")
    public ResponseEntity<Option> getOptionById(
            @PathVariable Long id) {
        return ResponseEntity.ok(optionService.getOptionById(id));
    }

    // Update Option
    @PutMapping("/{id}")
    public ResponseEntity<Option> updateOption(
            @PathVariable Long id,
            @RequestBody Option option) {
        return ResponseEntity.ok(optionService.updateOption(id, option));
    }

    // Delete Option
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOption(
            @PathVariable Long id) {
        optionService.deleteOption(id);
        return ResponseEntity.ok("Option deleted successfully");
    }
}