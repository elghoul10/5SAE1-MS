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


    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String sujet, article;
    private String imageUrl;
    private String specialite;

    public Article(String sujet, String article, String imageUrl, String specialite) {
        super();
        this.sujet = sujet;
        this.article = article;
        this.imageUrl=imageUrl;
        this.specialite=specialite;
    }

}
