package com.react.restapi.react_task_3.services;

import com.react.restapi.react_task_3.entities.Type;
import java.util.List;

public interface TypeService {
    List<Type> getAllType();
    List<Type> searchType(String name);
    Type addType(Type type);
    Type editType(Type type);
    Type getType(Long id);
    void deleteType(Type type);
}
