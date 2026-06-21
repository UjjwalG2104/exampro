package com.secureai.exampro.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "exam_sessions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExamSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sessionId;

    @ManyToOne
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "warning_count")
    private Integer warningCount = 0;

    @Column(name = "is_terminated")
    private Boolean isTerminated = false;

    @Column(name = "is_auto_submitted")
    private Boolean isAutoSubmitted = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "session_status")
    private SessionStatus sessionStatus;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (startTime == null) {
            startTime = LocalDateTime.now();
        }
        if (warningCount == null) {
            warningCount = 0;
        }
        if (isTerminated == null) {
            isTerminated = false;
        }
        if (isAutoSubmitted == null) {
            isAutoSubmitted = false;
        }
        if (sessionStatus == null) {
            sessionStatus = SessionStatus.STARTED;
        }
    }
}