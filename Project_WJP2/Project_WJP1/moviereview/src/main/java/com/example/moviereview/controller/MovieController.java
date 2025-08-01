package com.example.moviereview.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.moviereview.dto.MovieDTO;
import com.example.moviereview.service.MovieService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @GetMapping
    public ResponseEntity<List<MovieDTO>> getAll() {
        return ResponseEntity.ok(movieService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieDTO> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(movieService.getById(id));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public ResponseEntity<MovieDTO> create(@Valid @RequestBody MovieDTO dto) {
        return ResponseEntity.ok(movieService.create(dto));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<MovieDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody MovieDTO dto
    ) {
        return ResponseEntity.ok(movieService.update(id, dto));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        movieService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
