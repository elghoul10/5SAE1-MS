package com.esprit.microservices.event.Service;
import com.esprit.microservices.event.Entity.Event;
import com.esprit.microservices.event.Repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Predicate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private JavaMailSender mailSender;
    public Event addEvent(Event event,Long orderid) {
        System.out.println(orderid);
        event.setOrderTransportId(orderid);
        event.setCreatedAt(LocalDateTime.now());
        event.setUpdatedAt(LocalDateTime.now());
        Event savedEvent = eventRepository.save(event);
        String uniqueCode = "#Event-" + savedEvent.getId();
        savedEvent.setEventCode(uniqueCode);
        System.out.println(event.getOrderTransportId());
        return eventRepository.save(savedEvent);
    }
    public List<Event> getAllEvent(){
        return eventRepository.findAll();
    }


    public Page<Event> getEventsFilteredBy(String code, Long chauffeurId, Long orderTransportId, String status, Pageable pageable) {
        Specification<Event> specification = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (code != null) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("eventCode")), "%" + code.toLowerCase() + "%"));
            }

            if (chauffeurId != null) {
                predicates.add(criteriaBuilder.equal(root.get("chauffeurId"), chauffeurId));
            }

            if (orderTransportId != null) {
                predicates.add(criteriaBuilder.equal(root.get("orderTransportId"), orderTransportId));
            }
            if (status != null) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("status")), "%" + status.toLowerCase() + "%"));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Order.desc("id")));
        return eventRepository.findAll(specification, sortedPageable);
    }


    public Event updateEvent(Event newEvent) {
        Event event = eventRepository.findById(newEvent.getId()).get();
        if (event != null) {
            event.setEventCode(newEvent.getEventCode() == null ? event.getEventCode() : newEvent.getEventCode());
            event.setType(newEvent.getType() == null ? event.getType() : newEvent.getType());
            event.setDescription(newEvent.getDescription() == null ? event.getDescription() : newEvent.getDescription());
            event.setTimestamp(newEvent.getTimestamp() == null ? event.getTimestamp() : newEvent.getTimestamp());
            event.setStatus(newEvent.getStatus() == null ? event.getStatus() : newEvent.getStatus());
            event.setChauffeurId(newEvent.getChauffeurId() == null ? event.getChauffeurId() : newEvent.getChauffeurId());
            event.setOrderTransportId(newEvent.getOrderTransportId() == null ? event.getOrderTransportId() : newEvent.getOrderTransportId());
            event.setLocation(newEvent.getLocation() == null ? event.getLocation() : newEvent.getLocation());
            event.setImpactLevel(newEvent.getImpactLevel() == null ? event.getImpactLevel() : newEvent.getImpactLevel());
            event.setUpdatedAt(LocalDateTime.now());
            return eventRepository.save(event);
        } else
            return null;
    }

    public String deleteEvent(long id) {
        if (eventRepository.findById(id).isPresent()) {
            eventRepository.deleteById(id);
            return "Event supprimé";
        } else
            return "Event non supprimé";
    }


    public Event getEventbyId(Long id) {
        return eventRepository.findById(id).orElse(null);
    }

    public Event changeStatus(Long id,String status,String mail){
        Event event = eventRepository.findById(id).orElse(null);
        switch (status) {
            case "Traité":
                this.sendEmail(
                        mail,
                        "Votre événement a été traité avec succès",
                        String.format("Bonjour,\n\nNous avons le plaisir de vous informer que votre événement (ID : %d) a été traité avec succès.\n\nMerci pour votre confiance.\n\nCordialement,\nL'équipe de gestion des événements", id)
                );
                break;
            case "Refusé":
                this.sendEmail(
                        mail,
                        "Votre événement n'a pas été approuvé",
                        String.format("Bonjour,\n\nNous regrettons de vous informer que votre événement (ID : %d) n'a pas été approuvé. Pour toute assistance supplémentaire, veuillez contacter notre équipe de support.\n\nCordialement,\nL'équipe de gestion des événements", id)
                );
                break;
        }
        assert event != null;
        event.setStatus(status);
        eventRepository.save(event);
        return event;
    }


    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("testmailsenderspringboot@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}
