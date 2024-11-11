package tn.esprit.userms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")

public class UserRestAPI {
    @Autowired
    private UserService userService;

    @RequestMapping("/hello")
    public String sayHello() {
        System.out.println("Hello from Spring Boot!");  // Prints to the console
        return "Hello, World!";  // Response body
    }
    @RequestMapping("/AllUsers")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

}
