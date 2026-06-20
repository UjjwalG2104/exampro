package com.secureai.exampro.controller;

import com.secureai.exampro.entity.WebcamLog;
import com.secureai.exampro.service.WebcamLogService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/webcam-logs")
@CrossOrigin(origins = "http://localhost:3000")
public class WebcamLogController {

    private final WebcamLogService webcamLogService;


    public WebcamLogController(
            WebcamLogService webcamLogService) {

        this.webcamLogService = webcamLogService;
    }


    // Save webcam log
    @PostMapping
    public ResponseEntity<WebcamLog> createWebcamLog(
            @RequestBody WebcamLog webcamLog) {

        return ResponseEntity.ok(
                webcamLogService.createWebcamLog(webcamLog));
    }


    // Get all webcam logs
    @GetMapping
    public ResponseEntity<List<WebcamLog>> getAllWebcamLogs() {

        return ResponseEntity.ok(
                webcamLogService.getAllWebcamLogs());
    }


    // Get webcam log by ID
    @GetMapping("/{id}")
    public ResponseEntity<WebcamLog> getWebcamLogById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                webcamLogService.getWebcamLogById(id));
    }


    // Delete webcam log
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteWebcamLog(
            @PathVariable Long id) {

        webcamLogService.deleteWebcamLog(id);

        return ResponseEntity.ok(
                "Webcam log deleted successfully");
    }
}