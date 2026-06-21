package com.secureai.exampro.service;

import com.secureai.exampro.entity.*;
import com.secureai.exampro.repository.ResultRepository;
import com.secureai.exampro.repository.StudentAnswerRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ResultServiceImpl implements ResultService {

    private final ResultRepository resultRepository;
    private final StudentAnswerRepository studentAnswerRepository;

    public ResultServiceImpl(
            ResultRepository resultRepository,
            StudentAnswerRepository studentAnswerRepository) {
        this.resultRepository = resultRepository;
        this.studentAnswerRepository = studentAnswerRepository;
    }

    // Generate Result with real scoring
    @Override
    public Result generateResult(ExamSession session) {

        if (resultRepository.existsBySession(session)) {
            throw new RuntimeException(
                    "Result already generated for this session!");
        }

        // Get all answers submitted by student in this session
        List<StudentAnswer> answers =
                studentAnswerRepository.findBySession(session);

        Integer totalMarks = session.getExam().getTotalMarks();
        int correctCount = 0;

        // Count correct answers
        for (StudentAnswer answer : answers) {
            if (answer.getOption() != null &&
                    Boolean.TRUE.equals(answer.getOption().getIsCorrect())) {
                correctCount++;
            }
        }

        // Each correct answer = totalMarks / totalQuestions
        int totalQuestions = answers.size();
        int obtainedMarks = 0;

        if (totalQuestions > 0) {
            double marksPerQuestion = (double) totalMarks / totalQuestions;
            obtainedMarks = (int) Math.round(correctCount * marksPerQuestion);
        }

        double percentage = totalMarks > 0
                ? (obtainedMarks * 100.0) / totalMarks
                : 0.0;

        ResultStatus status = percentage >= 40
                ? ResultStatus.PASS
                : ResultStatus.FAIL;

        Result result = new Result();
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
                .orElseThrow(() -> new RuntimeException(
                        "Result not found with ID: " + id));
    }

    // Get result by session
    @Override
    public Result getResultBySession(ExamSession session) {
        return resultRepository.findBySession(session)
                .orElseThrow(() -> new RuntimeException(
                        "Result not found"));
    }

    // Get results by student ID
    public List<Result> getResultsByStudentId(Long studentId) {
        return resultRepository
                .findBySession_Student_StudentId(studentId);
    }

    // Get results by status
    @Override
    public List<Result> getResultsByStatus(ResultStatus resultStatus) {
        return resultRepository.findByResultStatus(resultStatus);
    }

    // Get results above percentage
    @Override
    public List<Result> getResultsAbovePercentage(Double percentage) {
        return resultRepository.findByPercentageGreaterThanEqual(percentage);
    }

    // Get rank list
    @Override
    public List<Result> getRankList() {
        return resultRepository.findAllByOrderByObtainedMarksDesc();
    }

    // Update result
    @Override
    public Result updateResult(Long id, Result result) {
        Result existing = getResultById(id);
        existing.setTotalMarks(result.getTotalMarks());
        existing.setObtainedMarks(result.getObtainedMarks());
        existing.setPercentage(result.getPercentage());
        existing.setResultStatus(result.getResultStatus());
        return resultRepository.save(existing);
    }

    // Delete result
    @Override
    public void deleteResult(Long id) {
        resultRepository.delete(getResultById(id));
    }
}