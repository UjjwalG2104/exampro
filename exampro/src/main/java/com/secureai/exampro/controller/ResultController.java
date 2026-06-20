package com.secureai.exampro.controller;

import com.secureai.exampro.entity.Result;
import com.secureai.exampro.service.ResultService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "http://localhost:3000")
public class ResultController {

    private final ResultService resultService;


    public ResultController(
            ResultService resultService) {

        this.resultService = resultService;
    }


    // Get all results
    @GetMapping
    public ResponseEntity<List<Result>> getAllResults() {

        return ResponseEntity.ok(
                resultService.getAllResults());
    }


    // Get result by ID
    @GetMapping("/{id}")
    public ResponseEntity<Result> getResultById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                resultService.getResultById(id));
    }


    // Update result
    @PutMapping("/{id}")
    public ResponseEntity<Result> updateResult(
            @PathVariable Long id,
            @RequestBody Result result) {

        return ResponseEntity.ok(
                resultService.updateResult(id, result));
    }


    // Delete result
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteResult(
            @PathVariable Long id) {

        resultService.deleteResult(id);

        return ResponseEntity.ok(
                "Result deleted successfully");
    }
}