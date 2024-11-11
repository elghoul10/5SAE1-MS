package tn.esprit.Ordre.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.Ordre.Entities.Ordre;

public interface OrdreRepository extends JpaRepository<Ordre, Long> {
}
