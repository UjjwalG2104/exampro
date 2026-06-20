package com.secureai.exampro.service;

import com.secureai.exampro.entity.SecurityLog;
import com.secureai.exampro.entity.ExamSession;
import com.secureai.exampro.entity.SecurityEventType;
import com.secureai.exampro.repository.SecurityLogRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SecurityLogServiceImpl implements SecurityLogService {

    private final SecurityLogRepository securityLogRepository;

    // Constructor Injection
    public SecurityLogServiceImpl(
            SecurityLogRepository securityLogRepository) {

        this.securityLogRepository = securityLogRepository;
    }

    // Record security violation
    @Override
    public SecurityLog createSecurityLog(
            SecurityLog securityLog) {

        return securityLogRepository.save(securityLog);
    }

    // Get all security logs
    @Override
    public List<SecurityLog> getAllSecurityLogs() {

        return securityLogRepository.findAll();
    }

    // Get security log by ID
    @Override
    public SecurityLog getSecurityLogById(
            Long id) {

        return securityLogRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                        "Security log not found with ID: " + id));
    }

    // Get logs of a session
    @Override
    public List<SecurityLog> getLogsBySession(
            ExamSession session) {

        return securityLogRepository.findBySession(session);
    }

    // Get logs by event type
    @Override
    public List<SecurityLog> getLogsByEventType(
            SecurityEventType eventType) {

        return securityLogRepository.findByEventType(eventType);
    }

    // Get logs by session and event type
    @Override
    public List<SecurityLog> getLogsBySessionAndEventType(
            ExamSession session,
            SecurityEventType eventType) {

        return securityLogRepository
                .findBySessionAndEventType(
                        session,
                        eventType);
    }

    // Count warning events
    @Override
    public long countWarnings(
            ExamSession session) {

        return securityLogRepository
                .countBySession(session);
    }

    // Get latest security activities
    @Override
    public List<SecurityLog> getLatestSecurityLogs() {

        return securityLogRepository
                .findAllByOrderByCreatedAtDesc();
    }

    // Delete security log
    @Override
    public void deleteSecurityLog(
            Long id) {

        SecurityLog log = getSecurityLogById(id);

        securityLogRepository.delete(log);
    }
}