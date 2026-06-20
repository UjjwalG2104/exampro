package com.secureai.exampro.controller;

import com.secureai.exampro.dto.AuthRequest;
import com.secureai.exampro.dto.JwtAuthenticationResponse;
import com.secureai.exampro.entity.User;
import com.secureai.exampro.service.AuthService;
import com.secureai.exampro.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {


    private final AuthService authService;
    private final UserService userService;


    public AuthController(
            AuthService authService,
            UserService userService) {

        this.authService = authService;
        this.userService = userService;
    }


    // Register User
    @PostMapping("/register")
    public ResponseEntity<User> register(
            @RequestBody User user) {

        return ResponseEntity.ok(
                userService.createUser(user)
        );
    }


    // Login API
    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationResponse> login(
            @RequestBody AuthRequest request) {

        return ResponseEntity.ok(
                authService.login(request)
        );
    }


    // Get user details
    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUser(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                userService.getUserById(id)
        );
    }
}