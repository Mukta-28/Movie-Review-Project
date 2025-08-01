package com.example.moviereview.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                // Change to your React app’s origin if different
                .allowedOrigins("http://localhost:5175")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
