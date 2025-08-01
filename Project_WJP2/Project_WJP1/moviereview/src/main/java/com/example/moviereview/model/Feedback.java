package com.example.moviereview.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "feedback")
@Data
@NoArgsConstructor
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false, length = 2000)
    private String message;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Feedback(String name, String email, String message) {
        this.name = name;
        this.email = email;
        this.message = message;
        this.createdAt = LocalDateTime.now();
    }
}
