package com.example.moviereview.security;

import com.example.moviereview.security.JwtUtil;
import com.example.moviereview.security.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        String token = null;

        if (StringUtils.hasText(header) && header.startsWith("Bearer ")) {
            token = header.substring(7);
        }

        if (token != null && jwtUtil.validateToken(token)) {
            String email = null;
            try {
                email = jwtUtil.getEmailFromToken(token);
            } catch (Exception ex) {
                filterChain.doFilter(request, response);
                return;
            }

            try {
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                // Cast to CustomUserDetails to get userId
                CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;
                Long userId = customUserDetails.getId();

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                customUserDetails,
                                null,
                                customUserDetails.getAuthorities()
                        );
                SecurityContextHolder.getContext().setAuthentication(authentication);

                // Optional: You can set userId as request attribute if you want to use it downstream
                request.setAttribute("userId", userId);

            } catch (Exception ex) {
                // Handle user not found or other exceptions here if needed
            }
        }

        filterChain.doFilter(request, response);
    }
}
