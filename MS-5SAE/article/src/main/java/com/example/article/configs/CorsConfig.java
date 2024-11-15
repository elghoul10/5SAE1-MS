package com.example.article.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")  // Autoriser toutes les routes
                        .allowedOrigins("http://localhost:4200")  // Autoriser l’origine Angular
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Autoriser les méthodes HTTP nécessaires
                        .allowedHeaders("*")  // Autoriser tous les en-têtes
                        .allowCredentials(true);
            }
        };
    }
}
