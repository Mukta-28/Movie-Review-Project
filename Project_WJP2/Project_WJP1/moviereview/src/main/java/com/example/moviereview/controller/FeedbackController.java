package com.example.moviereview.controller;

import com.example.moviereview.model.Feedback;
import com.example.moviereview.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:5173") 
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;

    @PostMapping
    public Feedback submitFeedback(@RequestBody Feedback feedback) {
        return feedbackService.saveFeedback(feedback);
    }
}
