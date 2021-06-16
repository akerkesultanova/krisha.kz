package com.react.restapi.react_task_3.services.impl;

import com.react.restapi.react_task_3.entities.Type;
import com.react.restapi.react_task_3.repositories.TypeRepository;
import com.react.restapi.react_task_3.services.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeServiceImpl implements TypeService {

    @Autowired
    private TypeRepository typeRepository;

    @Override
    public List<Type> getAllType() {
        return typeRepository.findAll();
    }

    @Override
    public List<Type> searchType(String name) {
        return null;
    }

    @Override
    public Type addType(Type type) {
        return typeRepository.save(type);
    }

    @Override
    public Type editType(Type type) {
        return typeRepository.save(type);
    }

    @Override
    public Type getType(Long id) {
        return typeRepository.getOne(id);
    }

    @Override
    public void deleteType(Type type) {
        typeRepository.delete(type);
    }
}
