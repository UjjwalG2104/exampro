package com.secureai.exampro.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentId;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    @Column(name = "roll_number", nullable = false, unique = true, length = 30)
    private String rollNumber;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    private Integer semester;

    @Column(length = 15)
    private String phone;

    @Column(name = "photo_url", length = 255)
    private String photoUrl;
}