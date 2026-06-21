package com.secureai.exampro.repository;

import com.secureai.exampro.entity.Result;
import com.secureai.exampro.entity.ExamSession;
import com.secureai.exampro.entity.ResultStatus;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ResultRepository
        extends JpaRepository<Result, Long> {

    // Find result of a particular exam session
    Optional<Result> findBySession(ExamSession session);

    // Check if result already exists
    boolean existsBySession(ExamSession session);

    // Find all results by status (PASS/FAIL)
    List<Result> findByResultStatus(ResultStatus resultStatus);

    // Find results by percentage
    List<Result> findByPercentageGreaterThanEqual(Double percentage);

    // Get all results ordered by highest marks
    List<Result> findAllByOrderByObtainedMarksDesc();

    // ✅ NEW — Get results by student ID
    List<Result> findBySession_Student_StudentId(Long studentId);
}