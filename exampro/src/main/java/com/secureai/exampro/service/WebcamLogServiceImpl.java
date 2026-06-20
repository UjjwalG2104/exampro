package com.secureai.exampro.service;

import com.secureai.exampro.entity.WebcamLog;
import com.secureai.exampro.entity.ExamSession;
import com.secureai.exampro.entity.DetectionResult;
import com.secureai.exampro.repository.WebcamLogRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WebcamLogServiceImpl implements WebcamLogService {

    private final WebcamLogRepository webcamLogRepository;

    // Constructor Injection
    public WebcamLogServiceImpl(
            WebcamLogRepository webcamLogRepository) {

        this.webcamLogRepository = webcamLogRepository;
    }

    // Save webcam monitoring record
    @Override
    public WebcamLog createWebcamLog(
            WebcamLog webcamLog) {

        return webcamLogRepository.save(webcamLog);
    }

    // Get all webcam logs
    @Override
    public List<WebcamLog> getAllWebcamLogs() {

        return webcamLogRepository.findAll();
    }

    // Get webcam log by ID
    @Override
    public WebcamLog getWebcamLogById(
            Long id) {

        return webcamLogRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                        "Webcam log not found with ID: " + id));
    }

    // Get webcam logs of a session
    @Override
    public List<WebcamLog> getLogsBySession(
            ExamSession session) {

        return webcamLogRepository.findBySession(session);
    }

    // Get logs by AI detection result
    @Override
    public List<WebcamLog> getLogsByDetectionResult(
            DetectionResult detectionResult) {

        return webcamLogRepository
                .findByDetectionResult(detectionResult);
    }

    // Get suspicious webcam records
    @Override
    public List<WebcamLog> getSuspiciousLogs(
            List<DetectionResult> results) {

        return webcamLogRepository
                .findByDetectionResultIn(results);
    }

    // Count suspicious activities
    @Override
    public long countSuspiciousActivities(
            ExamSession session,
            List<DetectionResult> results) {

        return webcamLogRepository
                .countBySessionAndDetectionResultIn(
                        session,
                        results);
    }

    // Get latest webcam logs
    @Override
    public List<WebcamLog> getLatestWebcamLogs() {

        return webcamLogRepository
                .findAllByOrderByCapturedAtDesc();
    }

    // Delete webcam record
    @Override
    public void deleteWebcamLog(
            Long id) {

        WebcamLog webcamLog = getWebcamLogById(id);

        webcamLogRepository.delete(webcamLog);
    }
}