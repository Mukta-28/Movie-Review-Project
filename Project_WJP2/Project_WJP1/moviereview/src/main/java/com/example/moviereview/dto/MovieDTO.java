package com.example.moviereview.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MovieDTO {
    private Long id; // for updates

    @NotBlank
    private String title;

    private String description;
    private String posterUrl;

    
    private Double averageRating;
}
