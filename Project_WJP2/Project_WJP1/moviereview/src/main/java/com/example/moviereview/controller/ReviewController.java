package com.example.moviereview.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.moviereview.dto.RatingCountDTO;
import com.example.moviereview.dto.ReviewDTO;
import com.example.moviereview.service.ReviewService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    // Public: List reviews for a given movie
    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<ReviewDTO>> getByMovie(@PathVariable Long movieId) {
        return ResponseEntity.ok(reviewService.getByMovie(movieId));
    }

    // Protected: Add a review (USER or ADMIN)
    @PreAuthorize("hasAnyAuthority('USER','ADMIN')")
    @PostMapping
    public ResponseEntity<?> addReview(@RequestBody ReviewDTO reviewDto, Authentication authentication) {
        var savedReview = reviewService.create(reviewDto, authentication);
        return ResponseEntity.ok(savedReview);
    }

    // ADMIN only: View all reviews
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public ResponseEntity<List<ReviewDTO>> getAll() {
        return ResponseEntity.ok(reviewService.getAll());
    }

    // ADMIN only: Delete a review
    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        reviewService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
   

    // Test endpoint to check authentication principal type and id
    @GetMapping("/test-auth")
    public ResponseEntity<String> testAuth(Authentication authentication) {
        Object principal = authentication.getPrincipal();
        System.out.println("Principal class: " + principal.getClass().getName());
        if (principal instanceof com.example.moviereview.security.CustomUserDetails) {
            Long id = ((com.example.moviereview.security.CustomUserDetails) principal).getId();
            System.out.println("User ID from principal: " + id);
            return ResponseEntity.ok("Logged user ID: " + id);
        } else {
            return ResponseEntity.ok("Principal is NOT CustomUserDetails: " + principal.toString());
        }
    }

    // Temporarily simplify @PreAuthorize to test access (remove userId check)
    @PreAuthorize("hasAnyAuthority('USER','ADMIN')")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReviewDTO>> getUserReviews(@PathVariable Long userId) {
        List<ReviewDTO> reviews = reviewService.findReviewsByUserId(userId);
        return ResponseEntity.ok(reviews);
    }

   

    @GetMapping("/movie/{movieId}/ratings-count")
    public ResponseEntity<List<RatingCountDTO>> getRatingCountsByMovie(@PathVariable Long movieId) {
        List<RatingCountDTO> ratingCounts = reviewService.getRatingCountsByMovie(movieId);
        return ResponseEntity.ok(ratingCounts);
    }
}
