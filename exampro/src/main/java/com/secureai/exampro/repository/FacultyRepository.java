package com.secureai.exampro.repository;

import com.secureai.exampro.entity.Faculty;
import com.secureai.exampro.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FacultyRepository extends JpaRepository<Faculty, Long> {

    // Find faculty by employee code
    Optional<Faculty> findByEmployeeCode(String employeeCode);

    // Check if employee code already exists
    boolean existsByEmployeeCode(String employeeCode);

    // Find all faculty members in a department
    List<Faculty> findByDepartment(Department department);

    // Search faculty by full name
    List<Faculty> findByFullNameContainingIgnoreCase(String fullName);
}