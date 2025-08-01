package com.example.moviereview.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.moviereview.dto.AuthDto;
import com.example.moviereview.dto.AuthResponse;
import com.example.moviereview.dto.LoginRequest;
import com.example.moviereview.dto.RegisterRequest;
import com.example.moviereview.model.User;
import com.example.moviereview.repository.UserRepository;
import com.example.moviereview.security.JwtUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authManager;
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    //when user resiter with alerady used email so to check duplicate email

    public AuthResponse register(@Valid RegisterRequest request) {
        if (userRepo.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use");  //Email already in use
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        userRepo.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
        AuthDto userDto = new AuthDto(user.getId(), user.getName(), user.getEmail(), user.getRole());

        return new AuthResponse(token, userDto);
    }

    public AuthResponse login(@Valid LoginRequest request) {
        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
        AuthDto userDto = new AuthDto(user.getId(), user.getName(), user.getEmail(), user.getRole());

        return new AuthResponse(token, userDto);
    }
}
