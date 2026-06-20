package com.secureai.exampro.repository;

import com.secureai.exampro.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

    // Find department by name
    Optional<Department> findByDepartmentName(String departmentName);

    // Check if department already exists
    boolean existsByDepartmentName(String departmentName);

    // Search departments by name
    List<Department> findByDepartmentNameContainingIgnoreCase(String keyword);
}