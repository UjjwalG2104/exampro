package com.secureai.exampro.service;

import com.secureai.exampro.entity.User;

import java.util.List;

public interface UserService {

    // Register a new user
    User createUser(User user);

    // Get all users
    List<User> getAllUsers();

    // Get user by ID
    User getUserById(Long id);

    // Get user by username
    User getUserByUsername(String username);

    // Get user by email
    User getUserByEmail(String email);

    // Update user details
    User updateUser(Long id, User user);

    // Change user password
    void changePassword(Long id, String newPassword);

    // Delete user
    void deleteUser(Long id);

    // Check if username exists
    boolean existsByUsername(String username);

    // Check if email exists
    boolean existsByEmail(String email);
}