package com.example.chauffeur.services;

import com.example.chauffeur.entity.Chauffeur;

import java.util.List;

public interface IChauffeurService {

    Chauffeur addChauffeur(Chauffeur chauffeur);

    Chauffeur updateChauffeur(Chauffeur chauffeur);

    List<Chauffeur> findAll();

    Chauffeur findById(long idChauffeur);

    void delete(long idChauffeur);
}
