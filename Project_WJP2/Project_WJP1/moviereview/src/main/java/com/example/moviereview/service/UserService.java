package com.example.moviereview.service;

import com.example.moviereview.model.User;
import com.example.moviereview.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepo;

    public List<User> getAll() {
        return userRepo.findAll();
    }
}
