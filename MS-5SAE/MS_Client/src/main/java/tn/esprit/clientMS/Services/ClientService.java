package tn.esprit.clientMS.Services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.clientMS.Repositories.ClientRepository;
import tn.esprit.clientMS.entities.Client;

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
}
