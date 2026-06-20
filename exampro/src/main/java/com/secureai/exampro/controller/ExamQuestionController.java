package com.secureai.exampro.controller;

import com.secureai.exampro.entity.ExamQuestion;
import com.secureai.exampro.service.ExamQuestionService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exam-questions")
@CrossOrigin(origins = "http://localhost:3000")
public class ExamQuestionController {

    private final ExamQuestionService examQuestionService;

    public ExamQuestionController(
            ExamQuestionService examQuestionService) {

        this.examQuestionService = examQuestionService;
    }

    // Add question to exam
    @PostMapping
    public ResponseEntity<ExamQuestion> addQuestion(
            @RequestBody ExamQuestion examQuestion) {

        return ResponseEntity.ok(
                examQuestionService.addQuestionToExam(examQuestion)
        );
    }

    // Get all exam questions
    @GetMapping
    public ResponseEntity<List<ExamQuestion>> getAllExamQuestions() {

        return ResponseEntity.ok(
                examQuestionService.getAllExamQuestions()
        );
    }

    // Get all questions by Exam ID
    @GetMapping("/exam/{examId}")
    public ResponseEntity<List<ExamQuestion>> getQuestionsByExam(
            @PathVariable Long examId) {

        return ResponseEntity.ok(
                examQuestionService.getQuestionsByExamId(examId)
        );
    }

    // Get exam question by ID
    @GetMapping("/{id}")
    public ResponseEntity<ExamQuestion> getExamQuestionById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                examQuestionService.getExamQuestionById(id)
        );
    }

    // Update exam question
    @PutMapping("/{id}")
    public ResponseEntity<ExamQuestion> updateExamQuestion(
            @PathVariable Long id,
            @RequestBody ExamQuestion examQuestion) {

        return ResponseEntity.ok(
                examQuestionService.updateExamQuestion(
                        id,
                        examQuestion
                )
        );
    }

    // Delete exam question
    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeQuestion(
            @PathVariable Long id) {

        examQuestionService.removeQuestionFromExam(id);

        return ResponseEntity.ok(
                "Question removed from exam successfully"
        );
    }
}