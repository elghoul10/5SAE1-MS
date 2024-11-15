package com.example.chauffeur.services;


import com.example.chauffeur.entity.Chauffeur;
import com.example.chauffeur.repositories.ChauffeurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChauffeurService implements IChauffeurService{

  private final ChauffeurRepository chauffeurRepos;


    @Override
    public Chauffeur addChauffeur(Chauffeur chauffeur) {
        return chauffeurRepos.save(chauffeur);
    }

    @Override
    public Chauffeur updateChauffeur(Chauffeur chauffeur) {
        return chauffeurRepos.save(chauffeur);
    }

    @Override
    public List<Chauffeur> findAll() {
        return (List<Chauffeur>) chauffeurRepos.findAll();
    }

    @Override
    public Chauffeur findById(long idChauffeur) {
        return chauffeurRepos.findById(idChauffeur).orElse(null);
    }

    @Override
    public void delete(long idChauffeur) {
           chauffeurRepos.deleteById(idChauffeur);
    }
}
