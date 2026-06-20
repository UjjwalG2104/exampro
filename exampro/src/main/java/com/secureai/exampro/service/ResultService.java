package com.secureai.exampro.service;

import com.secureai.exampro.entity.Result;
import com.secureai.exampro.entity.ExamSession;
import com.secureai.exampro.entity.ResultStatus;

import java.util.List;

public interface ResultService {

    // Generate result after exam completion
    Result generateResult(ExamSession session);

    // Get all results
    List<Result> getAllResults();

    // Get result by ID
    Result getResultById(Long id);

    // Get result by exam session
    Result getResultBySession(ExamSession session);

    // Get results by PASS/FAIL status
    List<Result> getResultsByStatus(
            ResultStatus resultStatus
    );

    // Get results above a percentage
    List<Result> getResultsAbovePercentage(
            Double percentage
    );

    // Get rank list
    List<Result> getRankList();

    // Update result details
    Result updateResult(
            Long id,
            Result result
    );

    // Delete result
    void deleteResult(Long id);
}