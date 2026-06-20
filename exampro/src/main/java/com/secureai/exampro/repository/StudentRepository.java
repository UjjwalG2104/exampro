package com.secureai.exampro.repository;

import com.secureai.exampro.entity.Student;
import com.secureai.exampro.entity.Department;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository 
        extends JpaRepository<Student, Long> {


    // Check duplicate roll number
    boolean existsByRollNumber(
            String rollNumber);


    // Find student by roll number
    Optional<Student> findByRollNumber(
            String rollNumber);


    // Get students by department
    List<Student> findByDepartment(
            Department department);


    // Search students by name
    List<Student> findByFullNameContainingIgnoreCase(
            String fullName);
}