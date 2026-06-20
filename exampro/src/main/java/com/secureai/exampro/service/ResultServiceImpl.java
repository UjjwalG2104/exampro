package com.secureai.exampro.service;

import com.secureai.exampro.entity.*;
import com.secureai.exampro.repository.ResultRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ResultServiceImpl implements ResultService {

    private final ResultRepository resultRepository;

    // Constructor Injection
    public ResultServiceImpl(ResultRepository resultRepository) {
        this.resultRepository = resultRepository;
    }

    // Generate Result
    @Override
    public Result generateResult(ExamSession session) {

        if (resultRepository.existsBySession(session)) {
            throw new RuntimeException(
                    "Result already generated for this exam session!");
        }

        Result result = new Result();

        Integer totalMarks = session.getExam().getTotalMarks();
        Integer obtainedMarks = 0;

        // Marks calculation logic will be expanded later
        // by checking StudentAnswer records

        Double percentage =
                (obtainedMarks * 100.0) / totalMarks;

        ResultStatus status =
                percentage >= 40
                        ? ResultStatus.PASS
                        : ResultStatus.FAIL;

        result.setSession(session);
        result.setTotalMarks(totalMarks);
        result.setObtainedMarks(obtainedMarks);
        result.setPercentage(percentage);
        result.setResultStatus(status);
        result.setPublishedAt(LocalDateTime.now());

        return resultRepository.save(result);
    }

    // Get all results
    @Override
    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }

    // Get result by ID
    @Override
    public Result getResultById(Long id) {

        return resultRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Result not found with ID: " + id));
    }

    // Get result by exam session
    @Override
    public Result getResultBySession(ExamSession session) {

        return resultRepository.findBySession(session)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Result not found"));
    }

    // Get results by status
    @Override
    public List<Result> getResultsByStatus(
            ResultStatus resultStatus) {

        return resultRepository
                .findByResultStatus(resultStatus);
    }

    // Get results above percentage
    @Override
    public List<Result> getResultsAbovePercentage(
            Double percentage) {

        return resultRepository
                .findByPercentageGreaterThanEqual(
                        percentage);
    }

    // Get ranking list
    @Override
    public List<Result> getRankList() {

        return resultRepository
                .findAllByOrderByObtainedMarksDesc();
    }

    // Update result details
    @Override
    public Result updateResult(
            Long id,
            Result result) {

        Result existingResult = getResultById(id);

        existingResult.setTotalMarks(
                result.getTotalMarks());

        existingResult.setObtainedMarks(
                result.getObtainedMarks());

        existingResult.setPercentage(
                result.getPercentage());

        existingResult.setResultStatus(
                result.getResultStatus());

        return resultRepository.save(existingResult);
    }

    // Delete result
    @Override
    public void deleteResult(Long id) {

        Result result = getResultById(id);

        resultRepository.delete(result);
    }
}


