package com.secureai.exampro.repository;

import com.secureai.exampro.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by username (used for login)
    Optional<User> findByUsername(String username);

    // Find user by email
    Optional<User> findByEmail(String email);

    // Check duplicate username
    boolean existsByUsername(String username);

    // Check duplicate email
    boolean existsByEmail(String email);
}