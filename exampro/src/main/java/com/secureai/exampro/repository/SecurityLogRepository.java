package com.secureai.exampro.repository;

import com.secureai.exampro.entity.SecurityLog;
import com.secureai.exampro.entity.ExamSession;
import com.secureai.exampro.entity.SecurityEventType;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SecurityLogRepository 
        extends JpaRepository<SecurityLog, Long> {

    // Get all security logs of an exam session
    List<SecurityLog> findBySession(
            ExamSession session
    );

    // Get logs by event type
    List<SecurityLog> findByEventType(
            SecurityEventType eventType
    );

    // Get security logs of a session by event type
    List<SecurityLog> findBySessionAndEventType(
            ExamSession session,
            SecurityEventType eventType
    );

    // Count warnings of a student session
    long countBySession(
            ExamSession session
    );

    // Get latest security events
    List<SecurityLog> findAllByOrderByCreatedAtDesc();
}