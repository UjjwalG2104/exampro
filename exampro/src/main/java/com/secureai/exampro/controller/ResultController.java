package com.secureai.exampro.controller;

import com.secureai.exampro.entity.ExamSession;
import com.secureai.exampro.entity.Result;
import com.secureai.exampro.service.ExamSessionService;
import com.secureai.exampro.service.ResultService;
import com.secureai.exampro.service.ResultServiceImpl;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "http://localhost:3000")
public class ResultController {

    private final ResultService resultService;
    private final ExamSessionService examSessionService;

    public ResultController(
            ResultService resultService,
            ExamSessionService examSessionService) {
        this.resultService = resultService;
        this.examSessionService = examSessionService;
    }

    // Get all results
    @GetMapping
    public ResponseEntity<List<Result>> getAllResults() {
        return ResponseEntity.ok(resultService.getAllResults());
    }

    // Get result by ID
    @GetMapping("/{id}")
    public ResponseEntity<Result> getResultById(@PathVariable Long id) {
        return ResponseEntity.ok(resultService.getResultById(id));
    }

    // ✅ NEW — Generate result after exam session completes
    @PostMapping("/generate/{sessionId}")
    public ResponseEntity<Result> generateResult(@PathVariable Long sessionId) {
        ExamSession session = examSessionService.getSessionById(sessionId);
        return ResponseEntity.ok(resultService.generateResult(session));
    }

    // ✅ NEW — Get results by student ID
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Result>> getResultsByStudent(
            @PathVariable Long studentId) {
        return ResponseEntity.ok(
                ((ResultServiceImpl) resultService)
                        .getResultsByStudentId(studentId));
    }

    // Update result
    @PutMapping("/{id}")
    public ResponseEntity<Result> updateResult(
            @PathVariable Long id,
            @RequestBody Result result) {
        return ResponseEntity.ok(resultService.updateResult(id, result));
    }

    // Delete result
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteResult(@PathVariable Long id) {
        resultService.deleteResult(id);
        return ResponseEntity.ok("Result deleted successfully");
    }
}