package com.secureai.exampro.service;

import com.secureai.exampro.entity.Department;
import com.secureai.exampro.entity.Faculty;
import com.secureai.exampro.repository.FacultyRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyServiceImpl implements FacultyService {

    private final FacultyRepository facultyRepository;

    // Constructor Injection
    public FacultyServiceImpl(FacultyRepository facultyRepository) {
        this.facultyRepository = facultyRepository;
    }

    // Add new faculty
    @Override
    public Faculty createFaculty(Faculty faculty) {

        if (facultyRepository.existsByEmployeeCode(
                faculty.getEmployeeCode())) {

            throw new RuntimeException(
                    "Employee code already exists!");
        }

        return facultyRepository.save(faculty);
    }

    // Get all faculty members
    @Override
    public List<Faculty> getAllFaculties() {
        return facultyRepository.findAll();
    }

    // Get faculty by ID
    @Override
    public Faculty getFacultyById(Long id) {

        return facultyRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                        "Faculty not found with ID: " + id));
    }

    // Get faculty by employee code
    @Override
    public Faculty getFacultyByEmployeeCode(
            String employeeCode) {

        return facultyRepository
                .findByEmployeeCode(employeeCode)
                .orElseThrow(() ->
                        new RuntimeException(
                        "Faculty not found: " + employeeCode));
    }

    // Get faculty by department
    @Override
    public List<Faculty> getFacultyByDepartment(
            Department department) {

        return facultyRepository.findByDepartment(
                department);
    }

    // Search faculty by name
    @Override
    public List<Faculty> searchFacultyByName(
            String fullName) {

        return facultyRepository
                .findByFullNameContainingIgnoreCase(
                        fullName);
    }

    // Update faculty details
    @Override
    public Faculty updateFaculty(
            Long id,
            Faculty faculty) {

        Faculty existingFaculty = getFacultyById(id);

        existingFaculty.setFullName(
                faculty.getFullName());

        existingFaculty.setQualification(
                faculty.getQualification());

        existingFaculty.setDepartment(
                faculty.getDepartment());

        return facultyRepository.save(existingFaculty);
    }

    // Delete faculty
    @Override
    public void deleteFaculty(Long id) {

        Faculty faculty = getFacultyById(id);

        facultyRepository.delete(faculty);
    }

    // Check employee code exists
    @Override
    public boolean existsByEmployeeCode(
            String employeeCode) {

        return facultyRepository
                .existsByEmployeeCode(employeeCode);
    }
}