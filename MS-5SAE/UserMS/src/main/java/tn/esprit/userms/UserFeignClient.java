package tn.esprit.userms;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@FeignClient(name = "user")
public interface UserFeignClient {
    @PostMapping("Users/createUser") @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<User> createCandidat(@RequestBody User user);

    @DeleteMapping(value = "Users/{id}", produces = MediaType.APPLICATION_JSON_VALUE) @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> deleteCandidat(@PathVariable(value = "id") int id);

    @RequestMapping("Users/GetUser")
    public Optional<User> getUser(@PathVariable(value = "id") int id);

    @RequestMapping("Users/AllUsers")
    public List<User> getUsers() ;
}
