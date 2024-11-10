package com.esprit.microservices.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/event")
@CrossOrigin(origins = "http://localhost:4200")
public class EventRestAPI {

    @GetMapping("")
    public ResponseEntity<String> welcome() {
        return new ResponseEntity<>("Welcome to the Foyer Micro-Service", HttpStatus.OK);
    }


    @Autowired
    private EventService eventService;
    @PostMapping(value = "/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Event> createFoyer(@RequestBody Event Foyer) {
        return new ResponseEntity<>(eventService.addFoyer(Foyer), HttpStatus.OK);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Event>> getFoyersByCapacities(
            @RequestParam(name = "lowCapacity") boolean lowCapacity,
            @RequestParam(name = "mediumCapacity") boolean mediumCapacity,
            @RequestParam(name = "highCapacity") boolean highCapacity) {

        List<Event> filteredFoyers = eventService.getFoyersByCapacities(lowCapacity, mediumCapacity, highCapacity);

        return ResponseEntity.ok(filteredFoyers);
    }
    @GetMapping("/capacity/{capacity}")
    public List<Event> getFoyersByCapacity(@PathVariable long capacity) {
        return eventService.findByCapacityFoyerLessThan(capacity);
    }
    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Event> updateFoyer(@PathVariable(value = "id") long id,
                                             @RequestBody Event Foyer){
        return new ResponseEntity<>(eventService.updateFoyer(id, Foyer),
                HttpStatus.OK);
    }
    @DeleteMapping(value = "/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> deleteFoyer(@PathVariable(value = "id") long id){
        return new ResponseEntity<>(eventService.deleteFoyer(id), HttpStatus.OK);
    }
    @GetMapping(value = "/foyers", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<Event>> getFoyers(){
        return new ResponseEntity<>(eventService.getFoyer(), HttpStatus.OK);
    }

    @GetMapping("/foyer/{id}")
    Event retrievefoyer(@PathVariable Long id){

        return eventService.getFoyer(id);
    }

}