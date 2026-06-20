package com.secureai.exampro.service;

import com.secureai.exampro.entity.User;
import com.secureai.exampro.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Constructor Injection
    public UserServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Register a new user
    @Override
    public User createUser(User user) {

        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists!");
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists!");
        }

        // Encrypt password before saving
        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

    // Get all users
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    @Override
    public User getUserById(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException(
                        "User not found with ID: " + id
                    )
                );
    }

    // Get user by username
    @Override
    public User getUserByUsername(String username) {

        return userRepository.findByUsername(username)
                .orElseThrow(() ->
                    new RuntimeException(
                        "User not found: " + username
                    )
                );
    }

    // Get user by email
    @Override
    public User getUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                    new RuntimeException(
                        "User not found: " + email
                    )
                );
    }

    // Update user details
    @Override
    public User updateUser(Long id, User user) {

        User existingUser = getUserById(id);

        existingUser.setFullName(user.getFullName());
        existingUser.setEmail(user.getEmail());

        return userRepository.save(existingUser);
    }

    // Change password
    @Override
    public void changePassword(
            Long id,
            String newPassword) {

        User user = getUserById(id);

        user.setPassword(
                passwordEncoder.encode(newPassword)
        );

        userRepository.save(user);
    }

    // Delete user
    @Override
    public void deleteUser(Long id) {

        User user = getUserById(id);

        userRepository.delete(user);
    }

    // Check username exists
    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    // Check email exists
    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}