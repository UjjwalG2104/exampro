package com.secureai.exampro.controller;

import com.secureai.exampro.entity.Department;
import com.secureai.exampro.service.DepartmentService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = "http://localhost:3000")
public class DepartmentController {

    private final DepartmentService departmentService;


    public DepartmentController(
            DepartmentService departmentService) {

        this.departmentService = departmentService;
    }


    // Create Department
    @PostMapping
    public ResponseEntity<Department> createDepartment(
            @RequestBody Department department) {

        return ResponseEntity.ok(
                departmentService.createDepartment(
                        department));
    }


    // Get all Departments
    @GetMapping
    public ResponseEntity<List<Department>> getAllDepartments() {

        return ResponseEntity.ok(
                departmentService.getAllDepartments());
    }


    // Get Department by ID
    @GetMapping("/{id}")
    public ResponseEntity<Department> getDepartmentById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                departmentService.getDepartmentById(id));
    }


    // Update Department
    @PutMapping("/{id}")
    public ResponseEntity<Department> updateDepartment(
            @PathVariable Long id,
            @RequestBody Department department) {

        return ResponseEntity.ok(
                departmentService.updateDepartment(
                        id, department));
    }


    // Delete Department
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDepartment(
            @PathVariable Long id) {

        departmentService.deleteDepartment(id);

        return ResponseEntity.ok(
                "Department deleted successfully");
    }
}