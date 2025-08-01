package com.example.moviereview.controller;

import com.example.moviereview.dto.*;
import com.example.moviereview.service.AuthService;

import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @Value("${admin.secret.key}")
    private String adminSecretKey;
      @PostConstruct
    public void init() {
        System.out.println("Admin Secret Key: " + adminSecretKey);
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        if ("admin".equalsIgnoreCase(request.getRole())) {
            if (!adminSecretKey.equals(request.getAdminKey())) {
                return ResponseEntity.status(403).body("Invalid Admin Secret Key");
            }
        }

        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
