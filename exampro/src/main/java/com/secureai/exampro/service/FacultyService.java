package com.secureai.exampro.service;

import com.secureai.exampro.entity.Department;
import com.secureai.exampro.entity.Faculty;

import java.util.List;

public interface FacultyService {

    // Add a new faculty
    Faculty createFaculty(Faculty faculty);

    // Get all faculty members
    List<Faculty> getAllFaculties();

    // Get faculty by ID
    Faculty getFacultyById(Long id);

    // Get faculty by employee code
    Faculty getFacultyByEmployeeCode(String employeeCode);

    // Get faculty by department
    List<Faculty> getFacultyByDepartment(Department department);

    // Search faculty by name
    List<Faculty> searchFacultyByName(String fullName);

    // Update faculty details
    Faculty updateFaculty(Long id, Faculty faculty);

    // Delete faculty
    void deleteFaculty(Long id);

    // Check employee code exists
    boolean existsByEmployeeCode(String employeeCode);
}