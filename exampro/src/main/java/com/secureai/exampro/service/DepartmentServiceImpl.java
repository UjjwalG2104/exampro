package com.secureai.exampro.service;

import com.secureai.exampro.entity.Department;
import com.secureai.exampro.repository.DepartmentRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    // Constructor Injection
    public DepartmentServiceImpl(
            DepartmentRepository departmentRepository) {

        this.departmentRepository = departmentRepository;
    }

    // Create Department
    @Override
    public Department createDepartment(Department department) {

        if (departmentRepository.existsByDepartmentName(
                department.getDepartmentName())) {

            throw new RuntimeException(
                    "Department already exists!");
        }

        return departmentRepository.save(department);
    }

    // Get all Departments
    @Override
    public List<Department> getAllDepartments() {

        return departmentRepository.findAll();
    }

    // Get Department by ID
    @Override
    public Department getDepartmentById(Long id) {

        return departmentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                        "Department not found with ID: " + id));
    }

    // Get Department by Name
    @Override
    public Department getDepartmentByName(String name) {

        return departmentRepository
                .findByDepartmentName(name)
                .orElseThrow(() ->
                        new RuntimeException(
                        "Department not found: " + name));
    }

    // Update Department
    @Override
    public Department updateDepartment(
            Long id,
            Department department) {

        Department existingDepartment = getDepartmentById(id);

        existingDepartment.setDepartmentName(
                department.getDepartmentName());

        existingDepartment.setDescription(
                department.getDescription());

        return departmentRepository.save(existingDepartment);
    }

    // Delete Department
    @Override
    public void deleteDepartment(Long id) {

        Department department = getDepartmentById(id);

        departmentRepository.delete(department);
    }

    // Check Department exists
    @Override
    public boolean existsByDepartmentName(
            String departmentName) {

        return departmentRepository
                .existsByDepartmentName(departmentName);
    }
}