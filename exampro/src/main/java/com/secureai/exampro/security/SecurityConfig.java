package com.secureai.exampro.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;


@Configuration
@EnableMethodSecurity
public class SecurityConfig {


    private final JwtAuthenticationFilter jwtFilter;


    public SecurityConfig(JwtAuthenticationFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {


        http
            // Enable CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // Disable CSRF
            .csrf(csrf -> csrf.disable())


            .authorizeHttpRequests(auth -> auth

                // Public APIs
                .requestMatchers(
                    "/api/auth/**",
                    "/swagger-ui/**",
                    "/swagger-ui.html",
                    "/v3/api-docs/**",
                    "/error",

                    // TEMP: Allow React User Management
                    "/api/users/**",
                    "/api/roles/**"
                ).permitAll()

                

    
    



                // Department & Audit only ADMIN
                .requestMatchers(
                    "/api/departments/**",
                    "/api/audit-logs/**"
                ).hasAuthority("ADMIN")


                // Exams + Exam Questions accessible to Admin, Faculty and Student
                .requestMatchers(
                    "/api/exams/**",
                    "/api/exam-questions/**"
                    ).hasAnyAuthority(
                        "ADMIN",
                        "FACULTY",
                        "STUDENT"
                        )

   
                .requestMatchers(
                    
                    "/api/questions/**",
                    "/api/options/**"
                    ).hasAnyAuthority(
                         "ADMIN",
                          "FACULTY",
                           "STUDENT"
                        )

                 .requestMatchers(
                    "/api/courses/**",
                    "/api/faculties/**"
                    ).hasAnyAuthority(
                         "ADMIN",
                         "FACULTY"
                    )         







                // Exam Sessions — Admin, Faculty, Student
                .requestMatchers(
                    "/api/exam-sessions/**"
                ).hasAnyAuthority(
                    "ADMIN",
                    "FACULTY",
                    "STUDENT"
                )

                // Student Answers — Admin, Student
                .requestMatchers(
                    "/api/student-answers/**"
                ).hasAnyAuthority(
                    "ADMIN",
                    "STUDENT"
                )

                // Results — Admin, Faculty, Student
                .requestMatchers(
                    "/api/results/**"
                ).hasAnyAuthority(
                    "ADMIN",
                    "FACULTY",
                    "STUDENT"
                )

                // Notifications — Admin, Faculty, Student
                .requestMatchers(
                    "/api/notifications/**"
                ).hasAnyAuthority(
                    "ADMIN",
                    "FACULTY",
                    "STUDENT"
                )

                // Students — Admin, Faculty
                .requestMatchers(
                    "/api/students/**"
                ).hasAnyAuthority(
                    "ADMIN",
                    "FACULTY"
                )


                // Everything else needs login
                .anyRequest()
                .authenticated()
            )


            // JWT Stateless
            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )


            // JWT Filter
            .addFilterBefore(
                jwtFilter,
                UsernamePasswordAuthenticationFilter.class
            );


        return http.build();
    }



    // CORS Configuration
   @Bean
public CorsConfigurationSource corsConfigurationSource() {

    CorsConfiguration config = new CorsConfiguration();

    config.setAllowedOriginPatterns(
        List.of("http://localhost:3000")
    );

    config.setAllowedMethods(
        List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")
    );

    config.setAllowedHeaders(
        List.of("*")
    );

    config.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();

    source.registerCorsConfiguration("/**", config);

    return source;
}
    // Password Encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    // Authentication Manager
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();
    }

}