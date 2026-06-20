package com.secureai.exampro.service;

import com.secureai.exampro.entity.AuditLog;
import com.secureai.exampro.entity.User;
import com.secureai.exampro.repository.AuditLogRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditLogServiceImpl implements AuditLogService {

    private final AuditLogRepository auditLogRepository;

    // Constructor Injection
    public AuditLogServiceImpl(
            AuditLogRepository auditLogRepository) {

        this.auditLogRepository = auditLogRepository;
    }

    // Create audit log
    @Override
    public AuditLog createAuditLog(
            AuditLog auditLog) {

        return auditLogRepository.save(auditLog);
    }

    // Get all audit logs
    @Override
    public List<AuditLog> getAllAuditLogs() {

        return auditLogRepository.findAll();
    }

    // Get audit log by ID
    @Override
    public AuditLog getAuditLogById(
            Long id) {

        return auditLogRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                        "Audit log not found with ID: " + id));
    }

    // Get logs performed by a user
    @Override
    public List<AuditLog> getLogsByUser(
            User user) {

        return auditLogRepository.findByUser(user);
    }

    // Get logs by action
    @Override
    public List<AuditLog> getLogsByAction(
            String action) {

        return auditLogRepository.findByAction(action);
    }

    // Get logs by entity name
    @Override
    public List<AuditLog> getLogsByEntityName(
            String entityName) {

        return auditLogRepository.findByEntityName(entityName);
    }

    // Get latest audit records
    @Override
    public List<AuditLog> getLatestAuditLogs() {

        return auditLogRepository
                .findAllByOrderByCreatedAtDesc();
    }

    // Count user activities
    @Override
    public long countUserActivities(
            User user) {

        return auditLogRepository.countByUser(user);
    }

    // Delete audit log
    @Override
    public void deleteAuditLog(
            Long id) {

        AuditLog auditLog = getAuditLogById(id);

        auditLogRepository.delete(auditLog);
    }
}