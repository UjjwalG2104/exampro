package com.secureai.exampro.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    // Secret key (change in production)
    private static final String SECRET_KEY =
            "secureexamprojwtsecretkeysecureexamprojwtsecretkey";

    private final SecretKey key =
            Keys.hmacShaKeyFor(SECRET_KEY.getBytes());


    // Generate JWT Token
    public String generateToken(
            UserDetails userDetails) {

        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(new Date())
                .expiration(
                    new Date(
                        System.currentTimeMillis()
                        + 1000 * 60 * 60 * 24
                    )
                )
                .signWith(key)
                .compact();
    }


    // Extract username from token
    public String extractUsername(
            String token) {

        return extractClaim(
                token,
                Claims::getSubject
        );
    }


    // Extract any claim
    public <T> T extractClaim(
            String token,
            Function<Claims, T> resolver) {

        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return resolver.apply(claims);
    }


    // Validate JWT token
    public boolean isTokenValid(
            String token,
            UserDetails userDetails) {

        String username =
                extractUsername(token);

        return username.equals(
                userDetails.getUsername())
                && !isTokenExpired(token);
    }


    // Check expiration
    private boolean isTokenExpired(
            String token) {

        Date expiration = extractClaim(
                token,
                Claims::getExpiration);

        return expiration.before(new Date());
    }
}