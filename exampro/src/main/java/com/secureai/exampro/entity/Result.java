package com.secureai.exampro.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
    name = "results",
    uniqueConstraints = {
        @UniqueConstraint(
            columnNames = {"session_id"}
        )
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resultId;

    @OneToOne
    @JoinColumn(name = "session_id", nullable = false)
    private ExamSession session;

    @Column(name = "total_marks", nullable = false)
    private Integer totalMarks;

    @Column(name = "obtained_marks", nullable = false)
    private Integer obtainedMarks;

    @Column(name = "percentage")
    private Double percentage;

    @Enumerated(EnumType.STRING)
    @Column(name = "result_status", nullable = false)
    private ResultStatus resultStatus;

    @Column(name = "rank_position")
    private Integer rankPosition;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;
}