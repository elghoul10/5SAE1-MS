package tn.esprit.Ordre.Services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.Ordre.Entities.Ordre;
import tn.esprit.Ordre.Repositories.OrdreRepository;

import facebook4j.Facebook;
import facebook4j.FacebookException;
import facebook4j.FacebookFactory;
import facebook4j.auth.AccessToken;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class OrdreService implements IOrdreService {
    OrdreRepository ordreRepository;

    FileStorageService fileStorageService;


    @Transactional
    @Override
    public Ordre addActualite(Ordre ordre){
        try {
            return ordreRepository.save(ordre);
        } catch (Exception e) {
            e.printStackTrace(); // Log or print the exception
            throw e; // Re-throw the exception if needed
        }
    }

    @Override
    public Ordre getActualite(Long idActualite){
        return this.ordreRepository.findById(idActualite).orElse(null);
    }

    @Override
    public List<Ordre> getAllActualites(){
        return  this.ordreRepository.findAll();
    }

    @Override
    public void deleteActualiteById(Long idActualite){
        this.ordreRepository.deleteById(idActualite);
    }

    @Override
    public Ordre updateActualite(Ordre ordre) {
        Ordre oldOrdre = ordreRepository.findById(ordre.getId()).orElse(null);
        return ordreRepository.save(ordre);
    }






}
