package com.secureai.exampro.controller;

import com.secureai.exampro.entity.StudentAnswer;
import com.secureai.exampro.service.StudentAnswerService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student-answers")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentAnswerController {

    private final StudentAnswerService studentAnswerService;

    public StudentAnswerController(
            StudentAnswerService studentAnswerService) {

        this.studentAnswerService = studentAnswerService;
    }


    // Submit Answer
    @PostMapping
    public ResponseEntity<StudentAnswer> submitAnswer(
            @RequestBody StudentAnswer answer) {

        return ResponseEntity.ok(
                studentAnswerService.submitAnswer(answer));
    }


    // Get All Answers
    @GetMapping
    public ResponseEntity<List<StudentAnswer>> getAllAnswers() {

        return ResponseEntity.ok(
                studentAnswerService.getAllAnswers());
    }


    // Get Answer By ID
    @GetMapping("/{id}")
    public ResponseEntity<StudentAnswer> getAnswerById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                studentAnswerService.getAnswerById(id));
    }


    // Update Answer
    @PutMapping("/{id}")
    public ResponseEntity<StudentAnswer> updateAnswer(
            @PathVariable Long id,
            @RequestBody StudentAnswer answer) {

        return ResponseEntity.ok(
                studentAnswerService.updateAnswer(id, answer));
    }


    // Delete Answer
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAnswer(
            @PathVariable Long id) {

        studentAnswerService.deleteAnswer(id);

        return ResponseEntity.ok(
                "Answer deleted successfully");
    }
}