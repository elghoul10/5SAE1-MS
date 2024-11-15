package com.example.article.services;

import com.example.article.entities.Article;
import org.springframework.web.multipart.MultipartFile;
import com.example.article.entities.Rating;
import com.example.article.entities.Reaction;

import java.util.List;

public interface IArticleService {
     Article handleImageFileUpload(MultipartFile fileImage, int id) ;

        Article getArticleId(int id);
    List<Article> getAll();

    Article addArticle(Article article);

    Article updateArticle(int id, Article newArticle);

    String deleteArticle(int id);

    Rating addRating(int articleId, int stars);
    Reaction addReaction(int articleId, String type);

}