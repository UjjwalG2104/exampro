package com.secureai.exampro.controller;

import com.secureai.exampro.entity.Faculty;
import com.secureai.exampro.service.FacultyService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculties")
@CrossOrigin(origins = "http://localhost:3000")
public class FacultyController {

    private final FacultyService facultyService;

    public FacultyController(FacultyService facultyService) {
        this.facultyService = facultyService;
    }

    // Create Faculty
    @PostMapping
    public ResponseEntity<Faculty> createFaculty(
            @RequestBody Faculty faculty) {

        return ResponseEntity.ok(
                facultyService.createFaculty(faculty));
    }

    // Get All Faculties
    @GetMapping
    public ResponseEntity<List<Faculty>> getAllFaculties() {

        return ResponseEntity.ok(
                facultyService.getAllFaculties());
    }

    // Get Faculty By ID
    @GetMapping("/{id}")
    public ResponseEntity<Faculty> getFacultyById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                facultyService.getFacultyById(id));
    }

    // Update Faculty
    @PutMapping("/{id}")
    public ResponseEntity<Faculty> updateFaculty(
            @PathVariable Long id,
            @RequestBody Faculty faculty) {

        return ResponseEntity.ok(
                facultyService.updateFaculty(id, faculty));
    }

    // Delete Faculty
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFaculty(
            @PathVariable Long id) {

        facultyService.deleteFaculty(id);

        return ResponseEntity.ok(
                "Faculty deleted successfully");
    }
}