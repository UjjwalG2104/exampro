package com.secureai.exampro.service;

import com.secureai.exampro.entity.WebcamLog;
import com.secureai.exampro.entity.ExamSession;
import com.secureai.exampro.entity.DetectionResult;

import java.util.List;

public interface WebcamLogService {

    // Save webcam monitoring record
    WebcamLog createWebcamLog(
            WebcamLog webcamLog
    );

    // Get all webcam logs
    List<WebcamLog> getAllWebcamLogs();

    // Get webcam log by ID
    WebcamLog getWebcamLogById(
            Long id
    );

    // Get all webcam records of a session
    List<WebcamLog> getLogsBySession(
            ExamSession session
    );

    // Get records by AI detection result
    List<WebcamLog> getLogsByDetectionResult(
            DetectionResult detectionResult
    );

    // Get suspicious webcam records
    List<WebcamLog> getSuspiciousLogs(
            List<DetectionResult> results
    );

    // Count suspicious activities in a session
    long countSuspiciousActivities(
            ExamSession session,
            List<DetectionResult> results
    );

    // Get latest webcam captures
    List<WebcamLog> getLatestWebcamLogs();

    // Delete webcam record
    void deleteWebcamLog(
            Long id
    );
}