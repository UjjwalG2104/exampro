package com.secureai.exampro.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "security_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SecurityLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long logId;

    @ManyToOne
    @JoinColumn(name = "session_id", nullable = false)
    private ExamSession session;

    @Enumerated(EnumType.STRING)
    @Column(name = "event_type", nullable = false)
    private SecurityEventType eventType;

    @Column(name = "warning_number")
    private Integer warningNumber;

    @Column(name = "event_description", columnDefinition = "TEXT")
    private String eventDescription;

    @Column(name = "ip_address", length = 45)
    private String ipAddress;

    @Column(name = "browser_information", length = 255)
    private String browserInformation;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}