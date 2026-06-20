package com.secureai.exampro.repository;

import com.secureai.exampro.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    // Find role by role name
    Optional<Role> findByRoleName(String roleName);

    // Check if role already exists
    boolean existsByRoleName(String roleName);
}