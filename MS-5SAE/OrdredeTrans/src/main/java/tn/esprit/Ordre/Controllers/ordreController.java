package tn.esprit.Ordre.Controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.Ordre.Entities.Ordre;
import tn.esprit.Ordre.Services.IOrdreService;

import java.util.List;

//@CrossOrigin(origins = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/ordre")
public class ordreController {
    IOrdreService actualiteService;

    @PostMapping("/addActualite")
    Ordre addActualite(@RequestBody Ordre ordre){
        return actualiteService.addActualite(ordre);
    }

    @GetMapping("/getOneActualite/{id}")
    Ordre getActualite(@PathVariable Long id){
        return actualiteService.getActualite(id);
    }

    @GetMapping
    List<Ordre> getAllActualites(){
        return actualiteService.getAllActualites();
    }

    @DeleteMapping("/deleteActualite/{id}")
    void deleteClubById(@PathVariable Long id){
        this.actualiteService.deleteActualiteById(id);
    }

    @PutMapping("/updateActualite")
    Ordre updateActualite(@RequestBody Ordre ordre){
        return  this.actualiteService.updateActualite(ordre);
    }

//    @CrossOrigin(origins = "*", allowedHeaders = "Requestor-Type", exposedHeaders = "X-Get-Header")
    @PostMapping("/uploadImage/{id}")
    public Ordre handleImageFileUpload(@RequestParam("fileImage") MultipartFile fileImage, @PathVariable long id) {
        return actualiteService.handleImageFileUpload(fileImage,id);
    }


    /*****************************************/

    @PostMapping("/shareFb/{id}")
    public String shareFb(@PathVariable Long id){
        return actualiteService.shareFb(id);
    }

}
