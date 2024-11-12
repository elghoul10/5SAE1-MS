package tn.esprit.userms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")

public class UserRestAPI {
    @Autowired
    private UserService userService;

    @RequestMapping("/hello")
    public String sayHello(@PathVariable String name) {
        System.out.println("Hello from Spring Boot!");  // Prints to the console
        return "Hello, World!"+name;  // Response body
    }
    @RequestMapping("/AllUsers")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/createUser") @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<User> createCandidat(@RequestBody User user) { return new ResponseEntity<>(userService.saveUser(user), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE) @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> deleteCandidat(@PathVariable(value = "id") int id){
        return new ResponseEntity<>(userService.deleteUser(id), HttpStatus.OK);
    }

    @RequestMapping("/GetUser")
    public Optional<User> getUser(@PathVariable(value = "id") int id){
        return userService.getUserById(id);
    }
}
