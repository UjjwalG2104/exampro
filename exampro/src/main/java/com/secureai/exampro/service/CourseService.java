package com.secureai.exampro.service;

import com.secureai.exampro.entity.Course;
import com.secureai.exampro.entity.Department;

import java.util.List;

public interface CourseService {

    // Create new course
    Course createCourse(Course course);

    // Get all courses
    List<Course> getAllCourses();

    // Get course by ID
    Course getCourseById(Long id);

    // Get course by code
    Course getCourseByCode(String courseCode);

    // Get courses by department
    List<Course> getCoursesByDepartment(Department department);

    // Get courses by semester
    List<Course> getCoursesBySemester(Integer semester);

    // Search course by name
    List<Course> searchCourseByName(String courseName);

    // Update course
    Course updateCourse(Long id, Course course);

    // Delete course
    void deleteCourse(Long id);

    // Check course code exists
    boolean existsByCourseCode(String courseCode);
}