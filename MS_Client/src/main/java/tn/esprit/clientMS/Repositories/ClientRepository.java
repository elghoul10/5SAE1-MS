package tn.esprit.clientMS.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.clientMS.entities.Client;

public interface ClientRepository extends JpaRepository<Client,Long> {
}
