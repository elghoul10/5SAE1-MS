package com.example.chauffeur.controller;


import com.example.chauffeur.entity.Chauffeur;
import com.example.chauffeur.services.IChauffeurService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chauffeur")
public class ChauffeurController {

    private final IChauffeurService chauffeurService;

    @PostMapping
    public Chauffeur addInscription(@RequestBody Chauffeur chauffeur) {
        return chauffeurService.addChauffeur(chauffeur);

    }

    @PutMapping
    public Chauffeur updateInscription(@RequestBody Chauffeur chauffeur) {
        return chauffeurService.updateChauffeur(chauffeur);
    }
    @GetMapping
    public List<Chauffeur> findAll() {
        return chauffeurService.findAll();
    }

    @GetMapping("{id}")
    public Chauffeur findById(@PathVariable long id) {
        Chauffeur chauffeur = chauffeurService.findById(id);
        return chauffeur;
    }

    @DeleteMapping("{id}")
    public boolean delete(@PathVariable long id) {

        chauffeurService.delete(id);
        return true;
    }

}
