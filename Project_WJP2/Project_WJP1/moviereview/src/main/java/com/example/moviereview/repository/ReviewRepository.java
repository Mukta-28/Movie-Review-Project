package com.example.moviereview.repository;

import com.example.moviereview.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByMovieId(Long movieId);

    @Transactional
    void deleteByMovieId(Long movieId);

     List<Review> findByUserId(Long userId);
     @Query("SELECT r.rating, COUNT(r) FROM Review r WHERE r.movie.id = :movieId GROUP BY r.rating ORDER BY r.rating DESC")
    List<Object[]> countReviewsByRatingForMovie(@Param("movieId") Long movieId);
}
