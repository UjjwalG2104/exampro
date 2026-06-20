package com.secureai.exampro.controller;

import com.secureai.exampro.entity.Role;
import com.secureai.exampro.service.RoleService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin(origins = "http://localhost:3000")
public class RoleController {

    private final RoleService roleService;


    // Constructor Injection
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }


    // Create new role
    @PostMapping
    public ResponseEntity<Role> createRole(
            @RequestBody Role role) {

        Role savedRole = roleService.createRole(role);

        return ResponseEntity.ok(savedRole);
    }


    // Get all roles
    @GetMapping
    public ResponseEntity<List<Role>> getAllRoles() {

        return ResponseEntity.ok(
                roleService.getAllRoles()
        );
    }


    // Get role by ID
    @GetMapping("/{id}")
    public ResponseEntity<Role> getRoleById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                roleService.getRoleById(id)
        );
    }


    // Update role
    @PutMapping("/{id}")
    public ResponseEntity<Role> updateRole(
            @PathVariable Long id,
            @RequestBody Role role) {

        Role updatedRole = roleService
                .updateRole(id, role);

        return ResponseEntity.ok(updatedRole);
    }


    // Delete role
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRole(
            @PathVariable Long id) {

        roleService.deleteRole(id);

        return ResponseEntity.ok(
                "Role deleted successfully"
        );
    }
}