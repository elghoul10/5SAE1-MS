package tn.esprit.Ordre.Services;

import org.springframework.web.multipart.MultipartFile;
import tn.esprit.Ordre.Entities.Ordre;

import java.util.List;

public interface IOrdreService {
    Ordre addActualite(Ordre ordre);

    Ordre getActualite(Long idActualite);

    List<Ordre> getAllActualites();

    void deleteActualiteById(Long idActualite);

    Ordre updateActualite(Ordre ordre);

    Ordre handleImageFileUpload(MultipartFile fileImage, long id);

    String shareFb(Long id);

    //**********************************************

}
