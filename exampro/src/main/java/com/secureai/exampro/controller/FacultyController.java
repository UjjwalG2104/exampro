package com.secureai.exampro.controller;

import com.secureai.exampro.entity.Faculty;
import com.secureai.exampro.repository.FacultyRepository;
import com.secureai.exampro.service.FacultyService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculties")
@CrossOrigin(origins = "http://localhost:3000")
public class FacultyController {

    private final FacultyService facultyService;
    private final FacultyRepository facultyRepository;

    public FacultyController(FacultyService facultyService,
                             FacultyRepository facultyRepository) {
        this.facultyService = facultyService;
        this.facultyRepository = facultyRepository;
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

    // ✅ NEW — Get Faculty by logged-in username
    @GetMapping("/by-username/{username}")
    public ResponseEntity<Faculty> getFacultyByUsername(
            @PathVariable String username) {

        Faculty faculty = facultyRepository
                .findAll()
                .stream()
                .filter(f -> f.getUser() != null &&
                        username.equals(f.getUser().getUsername()))
                .findFirst()
                .orElseThrow(() ->
                        new RuntimeException(
                                "Faculty not found for username: " + username));

        return ResponseEntity.ok(faculty);
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