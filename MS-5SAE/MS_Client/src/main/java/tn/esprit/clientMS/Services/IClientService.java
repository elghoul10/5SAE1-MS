package tn.esprit.clientMS.Services;

import tn.esprit.clientMS.entities.Client;

import java.util.List;

public interface IClientService {
    Client add(Client client);
    Client getById(Long id);
    List<Client> getAll();
    void delete(long id);
    Client update(Client client);
}
