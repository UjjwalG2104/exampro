package com.secureai.exampro.controller;

import com.secureai.exampro.entity.ExamSession;
import com.secureai.exampro.entity.SessionStatus;
import com.secureai.exampro.service.ExamSessionService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exam-sessions")
@CrossOrigin(origins = "http://localhost:3000")
public class ExamSessionController {

    private final ExamSessionService examSessionService;

    public ExamSessionController(
            ExamSessionService examSessionService) {

        this.examSessionService = examSessionService;
    }


    // Start exam session
    @PostMapping
    public ResponseEntity<ExamSession> startExam(
            @RequestBody ExamSession examSession) {

        return ResponseEntity.ok(
                examSessionService.startExam(examSession));
    }


    // Get all exam sessions
    @GetMapping
    public ResponseEntity<List<ExamSession>> getAllSessions() {

        return ResponseEntity.ok(
                examSessionService.getAllSessions());
    }


    // Get exam session by ID
    @GetMapping("/{id}")
    public ResponseEntity<ExamSession> getSessionById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                examSessionService.getSessionById(id));
    }


    // Get sessions by status
    @GetMapping("/status")
    public ResponseEntity<List<ExamSession>> getSessionsByStatus(
            @RequestParam SessionStatus status) {

        return ResponseEntity.ok(
                examSessionService.getSessionsByStatus(status));
    }


    // Complete exam
    @PutMapping("/{id}/complete")
    public ResponseEntity<ExamSession> completeExam(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                examSessionService.completeExam(id));
    }


    // Add warning (tab switch detected)
    @PutMapping("/{id}/warn")
    public ResponseEntity<ExamSession> warnSession(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                examSessionService.warnSession(id));
    }


    // Terminate exam due to cheating
    @PutMapping("/{id}/terminate")
    public ResponseEntity<ExamSession> terminateExam(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                examSessionService.terminateExam(id));
    }


    // Delete exam session
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSession(
            @PathVariable Long id) {

        examSessionService.deleteSession(id);

        return ResponseEntity.ok(
                "Exam session deleted successfully");
    }
}