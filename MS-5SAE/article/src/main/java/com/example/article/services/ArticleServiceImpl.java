package com.example.article.services;

import com.example.article.entities.Article;
import com.example.article.entities.Rating;
import com.example.article.entities.Reaction;
import com.example.article.repositories.ArticleRepository;
import com.example.article.repositories.RatingRepository;
import com.example.article.repositories.ReactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@AllArgsConstructor
@Service
public class ArticleServiceImpl implements IArticleService {
    private ArticleRepository articleRepository;
    private FileStorageService fileStorageService;
    @Autowired
    private RatingRepository ratingRepository;
    @Autowired
    private ReactionRepository reactionRepository;

    @Override
    public List<Article> getAll() {
        return articleRepository.findAll();
    }

    @Override
    public Article addArticle(Article article) {
        return articleRepository.save(article);
    }

    @Override
    public Article updateArticle(int id, Article newArticle) {
        if (articleRepository.findById(id).isPresent()) {
            Article existingArticle = articleRepository.findById(id).get();
            existingArticle.setSujet(newArticle.getSujet());
            existingArticle.setArticle(newArticle.getArticle());
            existingArticle.setImageUrl(newArticle.getImageUrl());
            existingArticle.setSpecialite(newArticle.getSpecialite());

            return articleRepository.save(existingArticle);
        } else
            return null;
    }


    public Article getArticleId(int id) {
        return articleRepository.findById(id).orElse(null);
    }

    @Override
    public String deleteArticle(int id) {
        if (articleRepository.findById(id).isPresent()) {
            articleRepository.deleteById(id);
            return "article supprimé";
        } else
            return "article non supprimé";
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

    @Override
    public Rating addRating(int articleId, int stars) {
        Rating rating = new Rating();
        rating.setStars(stars);

        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new RuntimeException("Article not found"));
        rating.setArticle(article);

        return ratingRepository.save(rating);
    }
    @Override
    public Reaction addReaction(int articleId, String type) {
        Reaction reaction = new Reaction();
        reaction.setType(type);

        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new RuntimeException("Article not found"));
        reaction.setArticle(article);

        return reactionRepository.save(reaction);
    }

}

