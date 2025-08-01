package com.example.moviereview.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthDto {
    private Long id;
    private String name;
    private String email;
    private String role;
}
