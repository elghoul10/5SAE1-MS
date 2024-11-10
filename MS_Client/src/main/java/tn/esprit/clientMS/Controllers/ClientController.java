package tn.esprit.clientMS.Controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.clientMS.Services.FileStorageService;
import tn.esprit.clientMS.Services.ClientService;
import tn.esprit.clientMS.entities.Client;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@AllArgsConstructor
@RequestMapping("/clients")
public class ClientController {
    ClientService specialiteService;
    FileStorageService fileStorageService;

    @GetMapping
    List<Client> getAll(){
        return specialiteService.getAll();
    }

    @PostMapping
    Client add(@RequestBody Client client){
        return  specialiteService.add(client);
    }

    @GetMapping("/{id}")
    Client getById(@PathVariable long id){
        return specialiteService.getById(id);
    }

    @PutMapping
    Client update(@RequestBody Client client){
        return  specialiteService.update(client);
    }

    @DeleteMapping("/{id}")
    void delete(@PathVariable long id){
        specialiteService.delete(id);
    }

    @CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "Requestor-Type", exposedHeaders = "X-Get-Header")
    @PostMapping("/uploadPdf/{id}")
    public Client handlePlanEtudeFileUpload(@RequestParam("file") MultipartFile file, @PathVariable long id) {
        return specialiteService.handlePlanEtudeFileUpload(file,id);
    }

    @CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "Requestor-Type", exposedHeaders = "X-Get-Header")
    @PostMapping("/uploadImage/{id}")
    public Client handleImageFileUpload(@RequestParam("fileImage") MultipartFile fileImage, @PathVariable long id) {
        return specialiteService.handleImageFileUpload(fileImage,id);
    }
    @PostMapping("/addWithFile")
    public Client addWithFile(@RequestParam("nom") String nom,
                              @RequestParam("diplome") String diplome,
                              @RequestParam("description") String description,
                              @RequestParam(value = "imageUrl", required = false) MultipartFile image,
                              @RequestParam(value = "pdf", required = false) MultipartFile pdf) {
        Client client = new Client();
        client.setNom(nom);
        client.setDiplome(diplome);
        client.setDescription(description);

        if (image != null) {
            // Traitez l'image
            String imageUrl = fileStorageService.storeFile(image);
            client.setImageUrl(imageUrl);
        }

        if (pdf != null) {
            // Traitez le fichier PDF
            String pdfUrl = fileStorageService.storeFile(pdf);
            client.setPdf(pdfUrl);
        }

        return specialiteService.add(client);
    }
}