package com.secureai.exampro.service;

import com.secureai.exampro.entity.SecurityLog;
import com.secureai.exampro.entity.ExamSession;
import com.secureai.exampro.entity.SecurityEventType;

import java.util.List;

public interface SecurityLogService {

    // Record a security violation
    SecurityLog createSecurityLog(
            SecurityLog securityLog
    );

    // Get all security logs
    List<SecurityLog> getAllSecurityLogs();

    // Get security log by ID
    SecurityLog getSecurityLogById(
            Long id
    );

    // Get all security logs of an exam session
    List<SecurityLog> getLogsBySession(
            ExamSession session
    );

    // Get logs by security event type
    List<SecurityLog> getLogsByEventType(
            SecurityEventType eventType
    );

    // Get logs of a session by event type
    List<SecurityLog> getLogsBySessionAndEventType(
            ExamSession session,
            SecurityEventType eventType
    );

    // Count warnings in an exam session
    long countWarnings(
            ExamSession session
    );

    // Get latest security activities
    List<SecurityLog> getLatestSecurityLogs();

    // Delete security log
    void deleteSecurityLog(
            Long id
    );
}