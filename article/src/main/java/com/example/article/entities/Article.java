package com.example.article.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Article implements Serializable {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nomRestaurant, menu;
    private String imageUrl;
    private String specialite;

    public Article(String nomRestaurant, String menu, String imageUrl, String specialite) {
        super();
        this.nomRestaurant = nomRestaurant;
        this.menu = menu;
        this.imageUrl=imageUrl;
        this.specialite=specialite;
    }

}
