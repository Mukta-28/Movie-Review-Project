package com.example.moviereview.service;

import com.example.moviereview.dto.MovieDTO;
import com.example.moviereview.model.Movie;
import com.example.moviereview.repository.MovieRepository;
import com.example.moviereview.repository.ReviewRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepo;
    private final ReviewRepository reviewRepo;

    private MovieDTO toDto(Movie m) {
        MovieDTO dto = new MovieDTO();
        dto.setId(m.getId());
        dto.setTitle(m.getTitle());
        dto.setDescription(m.getDescription());
        dto.setPosterUrl(m.getPosterUrl());

        List<Double> ratings = reviewRepo.findByMovieId(m.getId())
                .stream()
                .map(r -> r.getRating())
                .toList();

        if (!ratings.isEmpty()) {
            double avg = ratings.stream()
                    .mapToDouble(Double::doubleValue)
                    .average()
                    .orElse(0.0);
            dto.setAverageRating(avg);
        } else {
            dto.setAverageRating(null);
        }
        return dto;
    }

    private Movie toEntity(MovieDTO dto) {
        Movie m = new Movie();
        m.setTitle(dto.getTitle());
        m.setDescription(dto.getDescription());
        m.setPosterUrl(dto.getPosterUrl());
        return m;
    }

    public List<MovieDTO> getAll() {
        return movieRepo.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public MovieDTO getById(Long id) {
        Movie m = movieRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found"));
        return toDto(m);
    }

    // public MovieDTO create(@Valid MovieDTO dto) {
    //     Movie m = toEntity(dto);
    //     Movie saved = movieRepo.save(m);
    //     return toDto(saved);
    // }
    //when admin add same movie to privent that we use this
    public MovieDTO create(@Valid MovieDTO dto) {
    // Check for existing movie with the same title (case-insensitive)
    boolean exists = movieRepo.existsByTitleIgnoreCase(dto.getTitle());
    if (exists) {
        throw new RuntimeException("A movie with this title already exists");
    }

    Movie m = toEntity(dto);
    Movie saved = movieRepo.save(m);
    return toDto(saved);
}

    public MovieDTO update(Long id, @Valid MovieDTO dto) {
        Movie existing = movieRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found"));
        existing.setTitle(dto.getTitle());
        existing.setDescription(dto.getDescription());
        existing.setPosterUrl(dto.getPosterUrl());
        Movie updated = movieRepo.save(existing);
        return toDto(updated);
    }

    public void delete(Long id) {
        try {
            // Delete all reviews for this movie first
            reviewRepo.deleteByMovieId(id);

            // Then delete the movie itself
            movieRepo.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new RuntimeException("Movie not found with id " + id);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Cannot delete movie. There are dependent records.");
        }
    }
}
