package tn.esprit.Ordre;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class OrdreApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrdreApplication.class, args);
    }

}
