package com.example.chauffeur.entity;


import com.example.chauffeur.entity.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Chauffeur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    long idChauffeur;
    String nom;
    String prenom;
    Integer number;

    @Enumerated(EnumType.STRING)
    Status status;

}
