package com.esprit.microservices.event.Controller;

import com.esprit.microservices.event.Entity.Event;
import com.esprit.microservices.event.Service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/event")
@CrossOrigin(origins = "http://localhost:4200")
public class EventRestAPI {
    @Autowired
    private EventService eventService;

    @PostMapping(value = "/add/{orderid}")
    public Event createFoyer(@RequestBody Event event,@PathVariable(value = "orderid") long orderid) {
        return eventService.addEvent(event,orderid);
    }


    @GetMapping("/filter")
    public Page<Event> getEventsByFilter(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "chauffeurId", required = false) Long chauffeurId,
            @RequestParam(value = "orderTransportId", required = false) Long orderTransportId,
            @RequestParam(value = "status",required = false) String status,
            Pageable pageable) {
        return eventService.getEventsFilteredBy(code,chauffeurId,orderTransportId,status,pageable);
    }


    @PutMapping(value = "/{id}")
    public Event updateEvent(@RequestBody Event event){
        return eventService.updateEvent(event);
    }

    @DeleteMapping(value = "/delete/{id}")
    public String deleteEvent(@PathVariable(value = "id") long id){
        return eventService.deleteEvent(id);
    }

    @GetMapping(value = "/events")
    public List<Event> getFoyers(){
        return eventService.getAllEvent();
    }

    @GetMapping("/event/{id}")
    public Event retrievefoyer(@PathVariable Long id){
        return eventService.getEventbyId(id);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Event> changeEventStatus(
            @PathVariable Long id,
            @RequestParam String status,
            @RequestParam String mail) {
        try {
            Event updatedEvent = eventService.changeStatus(id, status, mail);
            return ResponseEntity.ok(updatedEvent);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

}
