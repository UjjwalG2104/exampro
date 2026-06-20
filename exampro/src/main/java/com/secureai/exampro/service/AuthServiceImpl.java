package com.secureai.exampro.service;

import com.secureai.exampro.dto.AuthRequest;
import com.secureai.exampro.dto.JwtAuthenticationResponse;
import com.secureai.exampro.entity.User;
import com.secureai.exampro.repository.UserRepository;
import com.secureai.exampro.security.JwtService;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;
    private final UserRepository userRepository;


    public AuthServiceImpl(
            AuthenticationManager authenticationManager,
            UserDetailsService userDetailsService,
            JwtService jwtService,
            UserRepository userRepository) {

        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }


    // Authenticate user and generate JWT
    @Override
    public JwtAuthenticationResponse login(
            AuthRequest request) {


        // Verify username and password
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );


        // Load authenticated user details
        UserDetails userDetails =
                userDetailsService.loadUserByUsername(
                        request.getUsername()
                );


        // Generate JWT token
        String token =
                jwtService.generateToken(userDetails);


        // Get user details from database
        User user = userRepository
                .findByUsername(request.getUsername())
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );


        // Return response
        return new JwtAuthenticationResponse(
                token,
                user.getUsername(),
                user.getRole().getRoleName(),
                "Login successful"
        );
    }
}