package com.secureai.exampro.repository;

import com.secureai.exampro.entity.WebcamLog;
import com.secureai.exampro.entity.ExamSession;
import com.secureai.exampro.entity.DetectionResult;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WebcamLogRepository 
        extends JpaRepository<WebcamLog, Long> {

    // Get all webcam logs of an exam session
    List<WebcamLog> findBySession(
            ExamSession session
    );

    // Find logs by AI detection result
    List<WebcamLog> findByDetectionResult(
            DetectionResult detectionResult
    );

    // Find suspicious records
    List<WebcamLog> findByDetectionResultIn(
            List<DetectionResult> results
    );

    // Find all logs ordered by latest capture
    List<WebcamLog> findAllByOrderByCapturedAtDesc();

    // Count suspicious activities in an exam session
    long countBySessionAndDetectionResultIn(
            ExamSession session,
            List<DetectionResult> results
    );
}