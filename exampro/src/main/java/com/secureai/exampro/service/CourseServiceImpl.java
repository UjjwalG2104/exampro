package com.secureai.exampro.service;

import com.secureai.exampro.entity.Course;
import com.secureai.exampro.entity.Department;
import com.secureai.exampro.repository.CourseRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    // Constructor Injection
    public CourseServiceImpl(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    // Create new course
    @Override
    public Course createCourse(Course course) {

        if (courseRepository.existsByCourseCode(
                course.getCourseCode())) {

            throw new RuntimeException(
                    "Course code already exists!");
        }

        return courseRepository.save(course);
    }

    // Get all courses
    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Get course by ID
    @Override
    public Course getCourseById(Long id) {

        return courseRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                        "Course not found with ID: " + id));
    }

    // Get course by code
    @Override
    public Course getCourseByCode(String courseCode) {

        return courseRepository
                .findByCourseCode(courseCode)
                .orElseThrow(() ->
                        new RuntimeException(
                        "Course not found: " + courseCode));
    }

    // Get courses by department
    @Override
    public List<Course> getCoursesByDepartment(
            Department department) {

        return courseRepository.findByDepartment(
                department);
    }

    // Get courses by semester
    @Override
    public List<Course> getCoursesBySemester(
            Integer semester) {

        return courseRepository.findBySemester(
                semester);
    }

    // Search course by name
    @Override
    public List<Course> searchCourseByName(
            String courseName) {

        return courseRepository
                .findByCourseNameContainingIgnoreCase(
                        courseName);
    }

    // Update course details
    @Override
    public Course updateCourse(
            Long id,
            Course course) {

        Course existingCourse = getCourseById(id);

        existingCourse.setCourseName(
                course.getCourseName());

        existingCourse.setCourseCode(
                course.getCourseCode());

        existingCourse.setDepartment(
                course.getDepartment());

        existingCourse.setSemester(
                course.getSemester());

        existingCourse.setCredits(
                course.getCredits());

        return courseRepository.save(existingCourse);
    }

    // Delete course
    @Override
    public void deleteCourse(Long id) {

        Course course = getCourseById(id);

        courseRepository.delete(course);
    }

    // Check course code exists
    @Override
    public boolean existsByCourseCode(
            String courseCode) {

        return courseRepository
                .existsByCourseCode(courseCode);
    }
}