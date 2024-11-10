package com.esprit.microservices.event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;
    public Event addFoyer(Event foyer) {
        return eventRepository.save(foyer);
    }
    public List<Event> getFoyer(){
        return eventRepository.findAll();
    }


    public List<Event> findByCapacityFoyerLessThan(long capacity) {
        return eventRepository.findByCapacityFoyerLessThan(capacity);
    }

    public List<Event> getFoyersByCapacities(boolean lowCapacity, boolean mediumCapacity, boolean highCapacity) {
        // Implement your logic to filter foyers based on capacities
        if (lowCapacity) {
            // Add logic for low capacity filtering
        }
        if (mediumCapacity) {
            // Add logic for medium capacity filtering
        }
        if (highCapacity) {
            // Add logic for high capacity filtering
        }

        return eventRepository.findAll(); // Return all foyers for now
    }

    public Event updateFoyer(long id, Event newFoyer) {
        if (eventRepository.findById(id).isPresent()) {
            Event existingFoyer = eventRepository.findById(id).get();
            existingFoyer.setNomFoyer(newFoyer.getNomFoyer());
            existingFoyer.setCapacityFoyer(newFoyer.getCapacityFoyer());

            return eventRepository.save(existingFoyer);
        } else
            return null;
    }
    public String deleteFoyer(long id) {
        if (eventRepository.findById(id).isPresent()) {
            eventRepository.deleteById(id);
            return "Event supprimé";
        } else
            return "Event non supprimé";
    }


    public Event getFoyer(Long id) {
        return eventRepository.findById(id).orElse(null);
    }
}