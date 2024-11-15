package com.example.chauffeur.repositories;

import com.example.chauffeur.entity.Chauffeur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChauffeurRepository extends JpaRepository<Chauffeur,Long> {
}
