package com.example.moviereview.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.example.moviereview.dto.ReviewDTO;
import com.example.moviereview.model.Movie;
import com.example.moviereview.model.Review;
import com.example.moviereview.model.User;
import com.example.moviereview.repository.MovieRepository;
import com.example.moviereview.repository.ReviewRepository;
import com.example.moviereview.repository.UserRepository;
import com.example.moviereview.dto.RatingCountDTO;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepo;
    private final MovieRepository movieRepo;
    private final UserRepository userRepo;

 
    private ReviewDTO toDto(Review r) {
    ReviewDTO dto = new ReviewDTO();
    dto.setId(r.getId());
    dto.setMovieId(r.getMovie().getId());
    dto.setUserId(r.getUser().getId());

    //  Hybrid: Use saved userName if present, fallback to user's actual name
    if (r.getUserName() != null) {
        dto.setUserName(r.getUserName());
    } else {
        dto.setUserName(r.getUser().getName());
    }

    dto.setComment(r.getComment());
    dto.setRating(r.getRating());
    return dto;
}


    public List<ReviewDTO> getAll() {
        return reviewRepo.findAll().stream()
                         .map(this::toDto)
                         .collect(Collectors.toList());
    }

    public List<ReviewDTO> getByMovie(Long movieId) {
        return reviewRepo.findByMovieId(movieId).stream()
                         .map(this::toDto)
                         .collect(Collectors.toList());
    }

    public ReviewDTO create(@Valid ReviewDTO dto, Authentication auth) {
        String email = auth.getName();
        User user = userRepo.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

        Movie movie = movieRepo.findById(dto.getMovieId())
                      .orElseThrow(() -> new RuntimeException("Movie not found"));

        Review r = new Review();
        r.setComment(dto.getComment());
        r.setRating(dto.getRating());
        r.setMovie(movie);
        r.setUser(user);
        r.setUserName(user.getName()); // Important: Save userName to DB
        r.setCreatedAt(LocalDateTime.now()); // Optional: save creation time

        Review saved = reviewRepo.save(r);
        return toDto(saved);
    }

    public void delete(Long id) {
        reviewRepo.deleteById(id);
    }

public List<ReviewDTO> findReviewsByUserId(Long userId) {
    return reviewRepo.findByUserId(userId).stream()
                     .map(this::toDto)
                     .collect(Collectors.toList());
}

public List<RatingCountDTO> getRatingCountsByMovie(Long movieId) {
    List<Object[]> results = reviewRepo.countReviewsByRatingForMovie(movieId);
    return results.stream()
        .map(obj -> new RatingCountDTO((Integer) obj[0], ((Long) obj[1]).intValue()))
        .collect(Collectors.toList());
}

}
