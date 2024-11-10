package com.example.article.services;

import com.example.article.entities.Article;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IArticleService {
     Article handleImageFileUpload(MultipartFile fileImage, int id) ;

        Article getRestaurantId(int id);
    List<Article> getAll();

    Article addRestaurant(Article article);

    Article updateRestaurant(int id, Article newArticle);

    String deleteRestaurant(int id);

}