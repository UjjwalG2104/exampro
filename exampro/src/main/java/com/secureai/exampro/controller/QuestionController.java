package com.secureai.exampro.controller;

import com.secureai.exampro.entity.Question;
import com.secureai.exampro.service.QuestionService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "http://localhost:3000")
public class QuestionController {

    private final QuestionService questionService;


    public QuestionController(
            QuestionService questionService) {

        this.questionService = questionService;
    }


    // Create Question
    @PostMapping
    public ResponseEntity<Question> createQuestion(
            @RequestBody Question question) {

        return ResponseEntity.ok(
                questionService.createQuestion(question));
    }


    // Get All Questions
    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {

        return ResponseEntity.ok(
                questionService.getAllQuestions());
    }


    // Get Question By ID
    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                questionService.getQuestionById(id));
    }


    // Search Question
    @GetMapping("/search")
    public ResponseEntity<List<Question>> searchQuestions(
            @RequestParam String keyword) {

        return ResponseEntity.ok(
                questionService.searchQuestions(keyword));
    }


    // Update Question
    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(
            @PathVariable Long id,
            @RequestBody Question question) {

        return ResponseEntity.ok(
                questionService.updateQuestion(id, question));
    }


    // Delete Question
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteQuestion(
            @PathVariable Long id) {

        questionService.deleteQuestion(id);

        return ResponseEntity.ok(
                "Question deleted successfully");
    }
}