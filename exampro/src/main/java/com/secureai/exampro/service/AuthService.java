package com.secureai.exampro.service;

import com.secureai.exampro.dto.AuthRequest;
import com.secureai.exampro.dto.JwtAuthenticationResponse;

public interface AuthService {

    // Authenticate user and generate JWT
    JwtAuthenticationResponse login(
            AuthRequest request);
}