package com.secureai.exampro.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(unique = true, nullable = false)
    private String username;


    @Column(nullable = false)
    private String password;


    @Column(unique = true)
    private String email;


    private String fullName;


    private Boolean enabled = true;


    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;


    // Constructors
    public User() {
    }


    public User(Long id, String username, String password,
                String email, String fullName,
                Boolean enabled, Role role) {

        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.fullName = fullName;
        this.enabled = enabled;
        this.role = role;
    }


    // Getters and Setters

    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public String getUsername() {
        return username;
    }


    public void setUsername(String username) {
        this.username = username;
    }


    public String getPassword() {
        return password;
    }


    public void setPassword(String password) {
        this.password = password;
    }


    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }


    public String getFullName() {
        return fullName;
    }


    public void setFullName(String fullName) {
        this.fullName = fullName;
    }


    public Boolean getEnabled() {
        return enabled;
    }


    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }


    public Role getRole() {
        return role;
    }


    public void setRole(Role role) {
        this.role = role;
    }
}