package com.react.restapi.react_task_3.services;

import com.react.restapi.react_task_3.entities.Users;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {

    Users getUserByEmail(String email);
    Users saveUser(Users user);
    Users addUser(Users user);
    Users getUser(Long id);
    void deleteUser(Users user);
    List<Users> getAllUser();

}