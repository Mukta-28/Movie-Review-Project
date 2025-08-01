package com.example.moviereview.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReviewDTO {
    private Long id;
    private String userName; 

    @NotNull(message = "movieId is required")
    private Long movieId;
    
    @NotNull(message = "userId is required")
    private Long userId; 


    @NotBlank(message = "comment cannot be blank")
    private String comment;

    @NotNull(message = "rating is required")
    @Min(value = 0, message = "rating must be ≥ 0")
    @Max(value = 5, message = "rating must be ≤ 5")
    private Double rating;
}
