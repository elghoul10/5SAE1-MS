package tn.esprit.Ordre.Controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.Ordre.Entities.Ordre;
import tn.esprit.Ordre.Services.IOrdreService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@AllArgsConstructor
@RequestMapping("/ordre")

public class ordreController {
    IOrdreService actualiteService;
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/addActualite")
    Ordre addActualite(@RequestBody Ordre ordre){
        return actualiteService.addActualite(ordre);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/getOneActualite/{id}")
    Ordre getActualite(@PathVariable Long id){
        return actualiteService.getActualite(id);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping
    List<Ordre> getAllActualites(){
        return actualiteService.getAllActualites();
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/deleteActualite/{id}")
    void deleteClubById(@PathVariable Long id){
        this.actualiteService.deleteActualiteById(id);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/updateActualite")
    Ordre updateActualite(@RequestBody Ordre ordre){
        return  this.actualiteService.updateActualite(ordre);
    }




}
