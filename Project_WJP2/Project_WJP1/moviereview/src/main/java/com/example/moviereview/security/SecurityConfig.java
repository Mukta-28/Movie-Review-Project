// package com.example.moviereview.security;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
// import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// @Configuration
// @EnableMethodSecurity  // Enables @PreAuthorize
// public class SecurityConfig {

//     @Autowired
//     private CustomUserDetailsService userDetailsService;

//     @Autowired
//     private JwtAuthenticationFilter jwtFilter;

//     @Bean
//     public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder bCrypt)
//             throws Exception {
//         return http.getSharedObject(AuthenticationManagerBuilder.class)
//                    .userDetailsService(userDetailsService)
//                    .passwordEncoder(bCrypt)
//                    .and()
//                    .build();
//     }

//     @Bean
//     public BCryptPasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         http
//             .csrf(csrf -> csrf.disable())
//             .cors(cors -> {}) // picks up CorsConfig
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers("/api/auth/**").permitAll()
//                 .requestMatchers(HttpMethod.GET, "/api/movies/**").permitAll()
//                 .requestMatchers(HttpMethod.GET, "/api/reviews/movie/**").permitAll()
//                 .requestMatchers(HttpMethod.GET, "/api/reviews/user/**").hasAnyAuthority("USER", "ADMIN")
//                 .requestMatchers("/api/movies/**").hasAuthority("ADMIN")
//                 .requestMatchers(HttpMethod.GET, "/api/users/**").hasAuthority("ADMIN")
//                 .requestMatchers(HttpMethod.GET, "/api/reviews").hasAuthority("ADMIN")
//                 .requestMatchers(HttpMethod.DELETE, "/api/reviews/**").hasAuthority("ADMIN")
//                 .requestMatchers(HttpMethod.POST, "/api/reviews").hasAnyAuthority("USER", "ADMIN")
//                 .anyRequest().authenticated()
//             )
//             .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//             .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

//         return http.build();
//     }
// }

package com.example.moviereview.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity  // Enables @PreAuthorize annotation
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtAuthenticationFilter jwtFilter;

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder bCrypt)
            throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(userDetailsService)
                .passwordEncoder(bCrypt)
                .and()
                .build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {}) // picks up CorsConfig if any
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/movies/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/reviews/movie/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/reviews/user/**").hasAnyAuthority("USER", "ADMIN")
                .requestMatchers("/api/movies/**").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/users/**").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/reviews").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/reviews/**").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/reviews").hasAnyAuthority("USER", "ADMIN")
                .requestMatchers("/api/feedback").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}

