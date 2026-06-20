package com.secureai.exampro.repository;

import com.secureai.exampro.entity.Course;
import com.secureai.exampro.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {

    // Find course by course code
    Optional<Course> findByCourseCode(String courseCode);

    // Check if course code already exists
    boolean existsByCourseCode(String courseCode);

    // Find all courses in a department
    List<Course> findByDepartment(Department department);

    // Find courses by semester
    List<Course> findBySemester(Integer semester);

    // Search courses by course name
    List<Course> findByCourseNameContainingIgnoreCase(String courseName);
}