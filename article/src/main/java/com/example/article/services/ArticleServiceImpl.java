package com.example.article.services;

import com.example.article.entities.Article;
import com.example.article.repositories.ArticleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@AllArgsConstructor
@Service
public class ArticleServiceImpl implements IArticleService {
    private ArticleRepository articleRepository;
    private FileStorageService fileStorageService;

    @Override
    public List<Article> getAll() {
        return articleRepository.findAll();
    }

    @Override
    public Article addRestaurant(Article article) {
        return articleRepository.save(article);
    }

    @Override
    public Article updateRestaurant(int id, Article newArticle) {
        if (articleRepository.findById(id).isPresent()) {
            Article existingArticle = articleRepository.findById(id).get();
            existingArticle.setNomRestaurant(newArticle.getNomRestaurant());
            existingArticle.setMenu(newArticle.getMenu());
            existingArticle.setImageUrl(newArticle.getImageUrl());
            existingArticle.setSpecialite(newArticle.getSpecialite());

            return articleRepository.save(existingArticle);
        } else
            return null;
    }


    public Article getRestaurantId(int id) {
        return articleRepository.findById(id).orElse(null);
    }

    @Override
    public String deleteRestaurant(int id) {
        if (articleRepository.findById(id).isPresent()) {
            articleRepository.deleteById(id);
            return "restaurant supprimé";
        } else
            return "restaurant non supprimé";
    }
    @Override
    public Article handleImageFileUpload(MultipartFile fileImage, int id) {
        if (fileImage.isEmpty()) {
            return null;
        }
        String fileName = fileStorageService.storeFile(fileImage);
        Article chambre = articleRepository.findById(id).orElse(null);
        chambre.setImageUrl(fileName);
        return articleRepository.save(chambre);
    }
}

