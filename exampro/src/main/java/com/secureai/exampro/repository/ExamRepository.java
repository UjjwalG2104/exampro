package com.secureai.exampro.repository;

import com.secureai.exampro.entity.Exam;
import com.secureai.exampro.entity.Course;
import com.secureai.exampro.entity.Faculty;
import com.secureai.exampro.entity.ExamStatus;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ExamRepository extends JpaRepository<Exam, Long> {

    // Find exams by course
    List<Exam> findByCourse(Course course);

    // Find exams created by faculty
    List<Exam> findByFaculty(Faculty faculty);

    // Find exams by status
    List<Exam> findByExamStatus(ExamStatus examStatus);

    // Search exams by title
    List<Exam> findByExamTitleContainingIgnoreCase(String examTitle);

    // Find upcoming exams
    List<Exam> findByStartTimeAfter(LocalDateTime currentTime);

    // Find exams between dates
    List<Exam> findByStartTimeBetween(
        LocalDateTime start,
        LocalDateTime end
    );
}