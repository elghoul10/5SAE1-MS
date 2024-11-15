package com.example.article.controllers;


import com.example.article.QRCode.QRCodeGenerator;
import com.example.article.entities.Article;
import com.example.article.entities.Rating;
import com.example.article.entities.Reaction;
import com.example.article.repositories.ArticleRepository;
import com.example.article.services.FileStorageService;
import com.example.article.services.ArticleServiceImpl;
import com.example.article.services.IArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.google.zxing.WriterException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/article")
@CrossOrigin(origins = "http://localhost:4200")

public class ArticleController {
    @Autowired
    FileStorageService fileStorageService;

    private final IArticleService articleService;

    @Autowired
    public ArticleController(IArticleService articleService) {
        this.articleService = articleService;
    }

    private static final String QR_CODE_IMAGE_DIRECTORY = "./src/main/resources/static/img/";
    @PostMapping("/uploadImage/{id}")
    public Article handleImageFileUpload(@RequestParam("fileImage") MultipartFile fileImage, @PathVariable int id) {
        return articleService.handleImageFileUpload(fileImage,id);
    }
    @GetMapping("/getImage/{fileName:.+}")
    public ResponseEntity<ByteArrayResource> getImage(@PathVariable String fileName) {
        ByteArrayResource resource = fileStorageService.loadFileAsResource(fileName);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) // Adjust the media type based on your image type
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                .body(resource);
    }

    @Autowired
    ArticleRepository articleRepository;


    @GetMapping("/qrCode/{id}")
    public ResponseEntity<ByteArrayResource> getQRCode(@PathVariable(value = "id") int id) {
        Article r = articleRepository.findById(id).orElse(null);

        // Vérifiez si l'article est introuvable
        if (r == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        String phrase = "*** Details Article " + r.getSujet() + " ***  Specialite Article : " + r.getSpecialite() +
                " Contenu : " + r.getArticle();
        byte[] image = new byte[0];
        try {
            image = QRCodeGenerator.getQRCodeImage(phrase, 250, 250);
        } catch (WriterException | IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

        ByteArrayResource resource = new ByteArrayResource(image);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=QRCode.jpg");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.IMAGE_JPEG)
                .contentLength(image.length)
                .body(resource);
    }




   /* @GetMapping("/qrCode")
    public String getQRCode(Model model) {
        String phrase = "hello welcome to my qrCode"; // Set the desired phrase here
        byte[] image = new byte[0];
        try {
            image = QRCodeGenerator.getQRCodeImage(phrase, 250, 250);
            String uniqueID = UUID.randomUUID().toString();

            String uniqueFileName = "QRCode_" + uniqueID;

            String imagePath = QR_CODE_IMAGE_DIRECTORY + uniqueFileName + ".png";
            QRCodeGenerator.generateQRCodeImage(phrase, 250, 250, imagePath);

        } catch (WriterException | IOException e) {
            e.printStackTrace();
        }
        String qrcode = Base64.getEncoder().encodeToString(image);
        model.addAttribute("phrase", phrase);
        model.addAttribute("qrcode", qrcode);
        return "qrcode";
    }*/




    @RequestMapping("/hello")
    public String sayHello() {
        String title = "Hello, i'm the Article Micro Service";
        System.out.println(title);
        return title;
    }

    @Autowired
    private ArticleServiceImpl articleServiceImp;

    @GetMapping
    public List<Article> getListCandid() {
        return articleServiceImp.getAll();
    }


    @GetMapping(value = "{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Article> fetchArticleById (@PathVariable(value = "id") int id){
        return new ResponseEntity<>(articleServiceImp.getArticleId(id), HttpStatus.OK);

    }

    @PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Article> createArticle(@RequestBody Article article) {
        return new ResponseEntity<>(articleServiceImp.addArticle(article), HttpStatus.OK);
    }


    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Article> updateArticle(@PathVariable(value = "id") int id,
                                                    @RequestBody Article article){
        return new ResponseEntity<>(articleServiceImp.updateArticle(id, article), HttpStatus.OK);
    }


    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> deleteArticle(@PathVariable(value = "id") int id){
        return new ResponseEntity<>(articleServiceImp.deleteArticle(id), HttpStatus.OK);
    }

    @PostMapping("/{articleId}/rating")
    public ResponseEntity<Rating> addRating(@PathVariable int articleId, @RequestParam int stars) {
        Rating rating = articleServiceImp.addRating(articleId, stars);
        return new ResponseEntity<>(rating, HttpStatus.CREATED);
    }

    @PostMapping("/{articleId}/reaction")
    public ResponseEntity<Reaction> addReaction(@PathVariable int articleId, @RequestParam String type) {
        Reaction reaction = articleServiceImp.addReaction(articleId, type);
        return new ResponseEntity<>(reaction, HttpStatus.CREATED);
    }

}
