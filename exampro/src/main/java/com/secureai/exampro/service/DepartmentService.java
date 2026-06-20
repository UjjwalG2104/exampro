package com.secureai.exampro.service;

import com.secureai.exampro.entity.Department;

import java.util.List;

public interface DepartmentService {

    // Create a new department
    Department createDepartment(Department department);

    // Get all departments
    List<Department> getAllDepartments();

    // Get department by ID
    Department getDepartmentById(Long id);

    // Get department by name
    Department getDepartmentByName(String name);

    // Update department details
    Department updateDepartment(Long id, Department department);

    // Delete department
    void deleteDepartment(Long id);

    // Check if department already exists
    boolean existsByDepartmentName(String departmentName);
}