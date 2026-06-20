package com.secureai.exampro.controller;

import com.secureai.exampro.entity.Course;
import com.secureai.exampro.service.CourseService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {

    private final CourseService courseService;


    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }


    // Create Course
    @PostMapping
    public ResponseEntity<Course> createCourse(
            @RequestBody Course course) {

        return ResponseEntity.ok(
                courseService.createCourse(course));
    }


    // Get All Courses
    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {

        return ResponseEntity.ok(
                courseService.getAllCourses());
    }


    // Get Course By ID
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                courseService.getCourseById(id));
    }


    // Update Course
    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(
            @PathVariable Long id,
            @RequestBody Course course) {

        return ResponseEntity.ok(
                courseService.updateCourse(id, course));
    }


    // Delete Course
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(
            @PathVariable Long id) {

        courseService.deleteCourse(id);

        return ResponseEntity.ok(
                "Course deleted successfully");
    }
}