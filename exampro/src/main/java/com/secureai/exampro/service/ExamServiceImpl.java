package com.secureai.exampro.service;

import com.secureai.exampro.entity.Exam;
import com.secureai.exampro.entity.ExamQuestion;
import com.secureai.exampro.entity.Course;
import com.secureai.exampro.entity.Faculty;
import com.secureai.exampro.entity.ExamStatus;
import com.secureai.exampro.repository.ExamRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ExamServiceImpl implements ExamService {

    private final ExamRepository examRepository;

    // Constructor Injection
    public ExamServiceImpl(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

    // Create new exam
    @Override
    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    // Get all exams
    @Override
    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    // Get exam by ID
    @Override
    public Exam getExamById(Long id) {

        return examRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                        "Exam not found with ID: " + id));
    }

    

    // Get exams by course
    @Override
    public List<Exam> getExamsByCourse(Course course) {

        return examRepository.findByCourse(course);
    }

    // Get exams by faculty
    @Override
    public List<Exam> getExamsByFaculty(Faculty faculty) {

        return examRepository.findByFaculty(faculty);
    }

    // Get exams by status
    @Override
    public List<Exam> getExamsByStatus(ExamStatus status) {

        return examRepository.findByExamStatus(status);
    }

    // Search exams by title
    @Override
    public List<Exam> searchExamByTitle(String title) {

        return examRepository
                .findByExamTitleContainingIgnoreCase(title);
    }

    // Get upcoming exams
    @Override
    public List<Exam> getUpcomingExams() {

        return examRepository
                .findByStartTimeAfter(LocalDateTime.now());
    }

    // Get exams between dates
    @Override
    public List<Exam> getExamsBetweenDates(
            LocalDateTime start,
            LocalDateTime end) {

        return examRepository
                .findByStartTimeBetween(start, end);
    }

    // Update exam details
    @Override
    public Exam updateExam(Long id, Exam exam) {

        Exam existingExam = getExamById(id);

        existingExam.setExamTitle(
                exam.getExamTitle());

        existingExam.setExamDescription(
                exam.getExamDescription());

        existingExam.setCourse(
                exam.getCourse());

        existingExam.setFaculty(
                exam.getFaculty());

        existingExam.setTotalMarks(
                exam.getTotalMarks());

        existingExam.setDurationMinutes(
                exam.getDurationMinutes());

        existingExam.setStartTime(
                exam.getStartTime());

        existingExam.setEndTime(
                exam.getEndTime());

        return examRepository.save(existingExam);
    }

    // Update exam status
    @Override
    public Exam updateExamStatus(
            Long id,
            ExamStatus status) {

        Exam exam = getExamById(id);

        exam.setExamStatus(status);

        return examRepository.save(exam);
    }

    // Delete exam
    @Override
    public void deleteExam(Long id) {

        Exam exam = getExamById(id);

        examRepository.delete(exam);
    }
}