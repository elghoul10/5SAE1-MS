package tn.esprit.clientMS.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class RessourceWebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/upload-directory/**")
                .addResourceLocations("file:./upload-directory/")  // Chemin absolu vers le dossier "upload"
                .setCachePeriod(0);
    }
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Permettre à toutes les routes
                .allowedOrigins("http://localhost:4200") // Autoriser uniquement votre application Angular
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Autoriser les méthodes HTTP
                .allowedHeaders("*") // Autoriser tous les en-têtes
                .allowCredentials(true); // Si nécessaire
    }
}