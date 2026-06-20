package com.secureai.exampro.service;

import com.secureai.exampro.entity.Department;
import com.secureai.exampro.entity.Student;

import java.util.List;

public interface StudentService {

    // Register a new student
    Student createStudent(Student student);

    // Get all students
    List<Student> getAllStudents();

    // Get student by ID
    Student getStudentById(Long id);

    // Get student by roll number
    Student getStudentByRollNumber(String rollNumber);

    // Get students by department
    List<Student> getStudentsByDepartment(Department department);

    // Search students by name
    List<Student> searchStudentsByName(String fullName);

    // Update student details
    Student updateStudent(Long id, Student student);

    // Delete student
    void deleteStudent(Long id);

    // Check roll number exists
    boolean existsByRollNumber(String rollNumber);
}