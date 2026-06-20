package com.secureai.exampro.controller;

import com.secureai.exampro.entity.Exam;
import com.secureai.exampro.entity.ExamStatus;
import com.secureai.exampro.service.ExamService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
@CrossOrigin(origins = "http://localhost:3000")
public class ExamController {

    private final ExamService examService;


    public ExamController(ExamService examService) {
        this.examService = examService;
    }


    // Create Exam
    @PostMapping
    public ResponseEntity<Exam> createExam(
            @RequestBody Exam exam) {

        return ResponseEntity.ok(
                examService.createExam(exam));
    }


    // Get All Exams
    @GetMapping
    public ResponseEntity<List<Exam>> getAllExams() {

        return ResponseEntity.ok(
                examService.getAllExams());
    }


    // Get Exam By ID
    @GetMapping("/{id}")
    public ResponseEntity<Exam> getExamById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                examService.getExamById(id));
    }


    // Update Exam
    @PutMapping("/{id}")
    public ResponseEntity<Exam> updateExam(
            @PathVariable Long id,
            @RequestBody Exam exam) {

        return ResponseEntity.ok(
                examService.updateExam(id, exam));
    }


    // Update Exam Status
    @PutMapping("/{id}/status")
    public ResponseEntity<Exam> updateStatus(
            @PathVariable Long id,
            @RequestParam ExamStatus status) {

        return ResponseEntity.ok(
                examService.updateExamStatus(id, status));
    }


    // Delete Exam
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExam(
            @PathVariable Long id) {

        examService.deleteExam(id);

        return ResponseEntity.ok(
                "Exam deleted successfully");
    }
}