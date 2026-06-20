package com.secureai.exampro.service;

import com.secureai.exampro.entity.AuditLog;
import com.secureai.exampro.entity.User;

import java.util.List;

public interface AuditLogService {

    // Create an audit log
    AuditLog createAuditLog(
            AuditLog auditLog
    );

    // Get all audit logs
    List<AuditLog> getAllAuditLogs();

    // Get audit log by ID
    AuditLog getAuditLogById(
            Long id
    );

    // Get all activities performed by a user
    List<AuditLog> getLogsByUser(
            User user
    );

    // Get logs by action type
    List<AuditLog> getLogsByAction(
            String action
    );

    // Get logs by entity name
    List<AuditLog> getLogsByEntityName(
            String entityName
    );

    // Get latest system activities
    List<AuditLog> getLatestAuditLogs();

    // Count total actions performed by a user
    long countUserActivities(
            User user
    );

    // Delete audit log
    void deleteAuditLog(
            Long id
    );
}