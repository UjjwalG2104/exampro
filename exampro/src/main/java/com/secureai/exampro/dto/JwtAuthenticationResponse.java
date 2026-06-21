package com.secureai.exampro.dto;

public class JwtAuthenticationResponse {


private String token;
private String username;
private String role;
private String message;
private Long studentId;

public JwtAuthenticationResponse() {
}

public JwtAuthenticationResponse(
        String token,
        String username,
        String role,
        Long studentId,
        String message) {

    this.token = token;
    this.username = username;
    this.role = role;
    this.studentId = studentId;
    this.message = message;
}

public String getToken() {
    return token;
}

public void setToken(String token) {
    this.token = token;
}

public String getUsername() {
    return username;
}

public void setUsername(String username) {
    this.username = username;
}

public String getRole() {
    return role;
}

public void setRole(String role) {
    this.role = role;
}

public String getMessage() {
    return message;
}

public void setMessage(String message) {
    this.message = message;
}

public Long getStudentId() {
    return studentId;
}

public void setStudentId(Long studentId) {
    this.studentId = studentId;
}


}
