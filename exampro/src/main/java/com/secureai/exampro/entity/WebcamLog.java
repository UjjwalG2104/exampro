package com.secureai.exampro.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "webcam_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WebcamLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long webcamLogId;

    @ManyToOne
    @JoinColumn(name = "session_id", nullable = false)
    private ExamSession session;

    @Column(name = "image_path", length = 255)
    private String imagePath;

    @Column(name = "face_detected")
    private Boolean faceDetected;

    @Column(name = "multiple_faces_detected")
    private Boolean multipleFacesDetected;

    @Column(name = "person_absent")
    private Boolean personAbsent;

    @Column(name = "ai_confidence_score")
    private Double aiConfidenceScore;

    @Enumerated(EnumType.STRING)
    @Column(name = "detection_result")
    private DetectionResult detectionResult;

    @Column(name = "captured_at")
    private LocalDateTime capturedAt;
}