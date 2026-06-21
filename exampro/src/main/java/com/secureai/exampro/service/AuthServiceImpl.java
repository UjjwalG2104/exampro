package com.secureai.exampro.service;

import com.secureai.exampro.dto.AuthRequest;
import com.secureai.exampro.dto.JwtAuthenticationResponse;
import com.secureai.exampro.entity.Student;
import com.secureai.exampro.entity.User;
import com.secureai.exampro.repository.StudentRepository;
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
private final StudentRepository studentRepository;

public AuthServiceImpl(
        AuthenticationManager authenticationManager,
        UserDetailsService userDetailsService,
        JwtService jwtService,
        UserRepository userRepository,
        StudentRepository studentRepository) {

    this.authenticationManager = authenticationManager;
    this.userDetailsService = userDetailsService;
    this.jwtService = jwtService;
    this.userRepository = userRepository;
    this.studentRepository = studentRepository;
}

@Override
public JwtAuthenticationResponse login(
        AuthRequest request) {

    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
            )
    );

    UserDetails userDetails =
            userDetailsService.loadUserByUsername(
                    request.getUsername()
            );

    String token =
            jwtService.generateToken(userDetails);

    User user = userRepository
            .findByUsername(request.getUsername())
            .orElseThrow(() ->
                    new RuntimeException(
                            "User not found"
                    )
            );

    Long studentId = null;

    if ("STUDENT".equals(
            user.getRole().getRoleName())) {

        Student student =
                studentRepository
                        .findByUser(user)
                        .orElse(null);

        if (student != null) {

            studentId =
                    student.getStudentId();
        }
    }

    return new JwtAuthenticationResponse(
            token,
            user.getUsername(),
            user.getRole().getRoleName(),
            studentId,
            "Login successful"
    );
}


}
