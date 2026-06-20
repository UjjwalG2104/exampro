package com.secureai.exampro.service;

import com.secureai.exampro.entity.Role;
import com.secureai.exampro.repository.RoleRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    // Constructor Injection
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    // Create Role
    @Override
    public Role createRole(Role role) {

        if (roleRepository.existsByRoleName(role.getRoleName())) {
            throw new RuntimeException("Role already exists!");
        }

        return roleRepository.save(role);
    }

    // Get all Roles
    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    // Get Role by ID
    @Override
    public Role getRoleById(Long id) {

        return roleRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Role not found with ID: " + id));
    }

    // Get Role by Name
    @Override
    public Role getRoleByName(String roleName) {

        return roleRepository.findByRoleName(roleName)
                .orElseThrow(() ->
                        new RuntimeException("Role not found: " + roleName));
    }

    // Update Role
    @Override
    public Role updateRole(Long id, Role role) {

        Role existingRole = getRoleById(id);

        existingRole.setRoleName(role.getRoleName());

        return roleRepository.save(existingRole);
    }

    // Delete Role
    @Override
    public void deleteRole(Long id) {

        Role role = getRoleById(id);

        roleRepository.delete(role);
    }
}