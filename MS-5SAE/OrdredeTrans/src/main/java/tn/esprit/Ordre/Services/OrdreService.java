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
            Date currentDate = new Date();
            ordre.setDateActualite(currentDate);
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
        Ordre oldOrdre = ordreRepository.findById(ordre.getIdActualite()).orElse(null);
        ordre.setImageActualite(oldOrdre.getImageActualite());
        return ordreRepository.save(ordre);
    }

    public Ordre handleImageFileUpload(MultipartFile fileImage, long id) {
        if (fileImage.isEmpty()) {
            return null;
        }
        String fileName = fileStorageService.storeFile(fileImage);
        Ordre ordre = ordreRepository.findById(id).orElse(null);
        ordre.setImageActualite(fileName);
        return ordreRepository.save(ordre);
    }

    @Override
    public String shareFb(Long id){
        String appId = "232528662540085";
        String appSecret = "60988e9928012f06c205e07717bb4196";
        String accessTokenString = "EAADTe8xUrzUBOwgL3BQmvYAVxXUjBZB0r9jwYdKZC0xJmcRN2Jg71FM8Gq0UB9RBnpNawZA1UZAc5sSjPlAMEWDg5YHot27sHtB1uzFympoyXc4cjZCXx5TtnZAU7W8f30GlUb4hTCm7M7AyJgUUP60enhgfyj9RvSPqJOrug8ILL3RlmYTdvicBx4ZAMoSxQ7W57jlMRpNXzaA5b50l46KYHgZD";

        // Set up Facebook4J
        Facebook facebook = new FacebookFactory().getInstance();
        facebook.setOAuthAppId(appId, appSecret);
        facebook.setOAuthAccessToken(new AccessToken(accessTokenString, null));

        // Post a status message
        Ordre ordre = ordreRepository.findById(id).orElse(null);

        String message = "New Post :" + "\n"+ ordre.getTitreActualite() + "\n" + ordre.getDescriptionActualite()+ "\n" + ordre.getDateActualite()+ "\n";
        try {
            facebook.postStatusMessage(message);
            return "Status message posted successfully.";
        } catch (FacebookException e) {
            e.printStackTrace();
            System.err.println("Error posting status message: " + e.getMessage());
            return  "Erreur";
        }
    }


}
