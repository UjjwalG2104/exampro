package com.secureai.exampro.service;

import com.secureai.exampro.entity.Role;

import java.util.List;

public interface RoleService {

    // Create new role
    Role createRole(Role role);

    // Get all roles
    List<Role> getAllRoles();

    // Get role by ID
    Role getRoleById(Long id);

    // Get role by name
    Role getRoleByName(String roleName);

    // Update existing role
    Role updateRole(Long id, Role role);

    // Delete role
    void deleteRole(Long id);
}