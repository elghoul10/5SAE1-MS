package com.esprit.microservices.event;

import com.esprit.microservices.event.Event; // Assurez-vous que c'est la bonne classe Event
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    @Query("select f from Event f where f.nomFoyer like :name")
    Page<Event> findEventsByName(@Param("name") String name, Pageable pageable);

    List<Event> findByCapacityFoyerLessThan(long capacity);
}
