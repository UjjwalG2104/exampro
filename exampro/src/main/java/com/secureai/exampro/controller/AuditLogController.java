package com.secureai.exampro.controller;

import com.secureai.exampro.entity.AuditLog;
import com.secureai.exampro.service.AuditLogService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audit-logs")
@CrossOrigin(origins = "http://localhost:3000")
public class AuditLogController {

    private final AuditLogService auditLogService;


    public AuditLogController(
            AuditLogService auditLogService) {

        this.auditLogService = auditLogService;
    }


    // Create audit log
    @PostMapping
    public ResponseEntity<AuditLog> createAuditLog(
            @RequestBody AuditLog auditLog) {

        return ResponseEntity.ok(
                auditLogService.createAuditLog(auditLog));
    }


    // Get all audit logs
    @GetMapping
    public ResponseEntity<List<AuditLog>> getAllAuditLogs() {

        return ResponseEntity.ok(
                auditLogService.getAllAuditLogs());
    }


    // Get audit log by ID
    @GetMapping("/{id}")
    public ResponseEntity<AuditLog> getAuditLogById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                auditLogService.getAuditLogById(id));
    }


    // Delete audit log
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAuditLog(
            @PathVariable Long id) {

        auditLogService.deleteAuditLog(id);

        return ResponseEntity.ok(
                "Audit log deleted successfully");
    }
}