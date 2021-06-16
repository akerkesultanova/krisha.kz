package com.react.restapi.react_task_3.services.impl;

import com.react.restapi.react_task_3.entities.Users;
import com.react.restapi.react_task_3.repositories.UserRepository;
import com.react.restapi.react_task_3.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Users user = userRepository.findByEmail(s);
        if(user!=null){
            return user;
        }else{
            throw new UsernameNotFoundException("USER NOT FOUND");
        }
    }

    @Override
    public Users getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Users saveUser(Users user) {
        return userRepository.save(user);
    }

    @Override
    public Users addUser(Users user) {
        return userRepository.save(user);
    }

    @Override
    public Users getUser(Long id) {
        return userRepository.getOne(id);
    }

    @Override
    public void deleteUser(Users user) {
        userRepository.delete(user);
    }

    @Override
    public List<Users> getAllUser() {
        return userRepository.findAll();
    }
}