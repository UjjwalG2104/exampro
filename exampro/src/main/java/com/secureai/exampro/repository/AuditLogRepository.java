package com.secureai.exampro.repository;

import com.secureai.exampro.entity.AuditLog;
import com.secureai.exampro.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuditLogRepository 
        extends JpaRepository<AuditLog, Long> {

    // Get all activities performed by a user
    List<AuditLog> findByUser(User user);

    // Find activities by action type
    List<AuditLog> findByAction(String action);

    // Find logs related to a specific entity
    List<AuditLog> findByEntityName(String entityName);

    // Get latest activities first
    List<AuditLog> findAllByOrderByCreatedAtDesc();

    // Count total actions performed by a user
    long countByUser(User user);
}