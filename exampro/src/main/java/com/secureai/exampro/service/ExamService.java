package com.secureai.exampro.service;

import com.secureai.exampro.entity.Exam;
import com.secureai.exampro.entity.Course;
import com.secureai.exampro.entity.Faculty;
import com.secureai.exampro.entity.ExamStatus;

import java.time.LocalDateTime;
import java.util.List;

public interface ExamService {

    // Create a new exam
    Exam createExam(Exam exam);

    // Get all exams
    List<Exam> getAllExams();

    // Get exam by ID
    Exam getExamById(Long id);

    // Get exams by course
    List<Exam> getExamsByCourse(Course course);

    // Get exams created by faculty
    List<Exam> getExamsByFaculty(Faculty faculty);

    // Get exams by status
    List<Exam> getExamsByStatus(ExamStatus status);

    // Search exams by title
    List<Exam> searchExamByTitle(String title);

    // Get upcoming exams
    List<Exam> getUpcomingExams();

    // Get exams between two dates
    List<Exam> getExamsBetweenDates(
            LocalDateTime start,
            LocalDateTime end
    );

    // Update exam details
    Exam updateExam(Long id, Exam exam);

    // Update exam status
    Exam updateExamStatus(
            Long id,
            ExamStatus status
    );

    // Delete exam
    void deleteExam(Long id);
}