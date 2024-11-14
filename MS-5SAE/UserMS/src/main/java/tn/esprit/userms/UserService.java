package tn.esprit.userms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserFeignClient jobUserService;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public String deleteUser(Integer id) {
            if (userRepository.findById(id).isPresent()) { userRepository.deleteById(id);
                return "candidat supprimé";
            } else
                return "candidat non supprimé";
        }

    public String login(String email,String password){
        if(userRepository.existsByEmailAndPassword(email,password)){
            return "success";
        }else{
            return "fail";
        }
    }


}
