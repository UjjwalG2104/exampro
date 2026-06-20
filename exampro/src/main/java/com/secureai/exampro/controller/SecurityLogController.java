package com.secureai.exampro.controller;

import com.secureai.exampro.entity.SecurityLog;
import com.secureai.exampro.service.SecurityLogService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/security-logs")
@CrossOrigin(origins = "http://localhost:3000")
public class SecurityLogController {

    private final SecurityLogService securityLogService;


    public SecurityLogController(
            SecurityLogService securityLogService) {

        this.securityLogService = securityLogService;
    }


    // Create security log
    @PostMapping
    public ResponseEntity<SecurityLog> createLog(
            @RequestBody SecurityLog securityLog) {

        return ResponseEntity.ok(
                securityLogService.createSecurityLog(securityLog));
    }


    // Get all security logs
    @GetMapping
    public ResponseEntity<List<SecurityLog>> getAllLogs() {

        return ResponseEntity.ok(
                securityLogService.getAllSecurityLogs());
    }


    // Get security log by ID
    @GetMapping("/{id}")
    public ResponseEntity<SecurityLog> getLogById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                securityLogService.getSecurityLogById(id));
    }


    // Delete security log
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLog(
            @PathVariable Long id) {

        securityLogService.deleteSecurityLog(id);

        return ResponseEntity.ok(
                "Security log deleted successfully");
    }
}