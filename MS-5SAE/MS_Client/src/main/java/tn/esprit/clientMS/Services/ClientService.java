package tn.esprit.clientMS.Services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.clientMS.Repositories.ClientRepository;
import tn.esprit.clientMS.entities.Client;


import facebook4j.Facebook;
import facebook4j.FacebookException;
import facebook4j.FacebookFactory;
import facebook4j.auth.AccessToken;

import java.util.List;

@Service
@AllArgsConstructor
public class ClientService implements IClientService {

    ClientRepository clientRepository;
    FileStorageService fileStorageService;


    @Override
    public Client add(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public Client getById(Long id) {
        return clientRepository.findById(id).orElse(null);
    }

    @Override
    public List<Client> getAll() {
        return clientRepository.findAll();
    }

    @Override
    public void delete(long id) {
        clientRepository.deleteById(id);
    }

    @Override
    public Client update(Client client) {
        Client oldClient = clientRepository.findById(client.getId()).orElse(null);
        client.setImageUrl(oldClient.getImageUrl());
        client.setPdf(oldClient.getPdf());
        return clientRepository.save(client);
    }

    public Client handlePlanEtudeFileUpload(MultipartFile file, long id) {
        if (file.isEmpty()) {
            return null;
        }
        String fileName = fileStorageService.storeFile(file);
        Client client = clientRepository.findById(id).orElse(null);
        client.setPdf(fileName);
        return clientRepository.save(client);
    }

    public Client handleImageFileUpload(MultipartFile fileImage, long id) {
        if (fileImage.isEmpty()) {
            return null;
        }
        String fileName = fileStorageService.storeFile(fileImage);
        Client client = clientRepository.findById(id).orElse(null);
        client.setImageUrl(fileName);
        return clientRepository.save(client);
    }


    @Override
    public String shareFb(Long id){
        String appId = "930407181631867";
        String appSecret = "459e8c9e7384671c47216db0961d126c";
        String accessTokenString = "EAANOM02OwXsBO9XsXVu7oLA6CkoZAdRqlHghsRvgrnU1KzGqKmMaOrfu1Fbqb2R1X5X1tlpRSzJd1v0MdkCx8JCFy49UVmse57e6pBJY8KEUIE2dZBkW9wTT2gCGqyf6PE5P9WFvtDYjLv24WZANvT4MTxoeRaj4kgHiEzLYrSvhOnPU2AywGRZCWVhvFFJLAQ2yvZAz5c0dqLZAZB4ALTKkagZD";

        // Set up Facebook4J
        Facebook facebook = new FacebookFactory().getInstance();
        facebook.setOAuthAppId(appId, appSecret);
        facebook.setOAuthAccessToken(new AccessToken(accessTokenString, null));

        // Post a status message
        Client actualite = clientRepository.findById(id).orElse(null);

        String message = "New Post :" + "\n"+ actualite.getNom() + "\n" + actualite.getDescription()+ "\n" + actualite.getImageUrl()+ "\n";
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
