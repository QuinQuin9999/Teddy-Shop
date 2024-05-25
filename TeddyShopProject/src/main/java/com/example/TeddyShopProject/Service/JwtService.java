package com.example.TeddyShopProject.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

// import io.jsonwebtoken.security.Keys;
// import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Service
public class JwtService {

    // private static final String ACCESS_TOKEN_SECRET = "access-token";
    // private static final String REFRESH_TOKEN_SECRET = "refresh-token";
    private static final int ACCESS_TOKEN_EXPIRATION = 3600;
    private static final int REFRESH_TOKEN_EXPIRATION = 31536000;

    public String generateAccessToken(Map<String, Object> payload) {
        SecretKey key = Jwts.SIG.HS256.key().build();
        return Jwts.builder()
                .claims(payload)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION * 1000))
                // .setClaims(payload)
                // .setIssuedAt(new Date(System.currentTimeMillis()))
                // .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION
                // *
                // 1000))
                .signWith(key, Jwts.SIG.HS256)
                .compact();
    }

    public String generateRefreshToken(Map<String, Object> payload) {
        SecretKey key = Jwts.SIG.HS256.key().build();
        return Jwts.builder()
                .claims(payload)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION * 1000))
                .signWith(key, Jwts.SIG.HS256)
                .compact();
    }

    public Map<String, Object> refreshTokenJwtService(String token) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(Jwts.SIG.HS256.key().build())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            String newAccessToken = generateAccessToken(claims);

            Map<String, Object> response = new HashMap<>();
            response.put("status", "OK");
            response.put("message", "SUCCESS");
            response.put("accessToken", newAccessToken);
            return response;
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "ERR");
            response.put("message", "The authentication");
            return response;
        }
    }
}