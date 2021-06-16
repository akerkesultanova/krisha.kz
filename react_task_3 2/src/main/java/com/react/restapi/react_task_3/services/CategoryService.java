package com.react.restapi.react_task_3.services;

import com.react.restapi.react_task_3.entities.Category;
import java.util.List;

public interface CategoryService {

    List<Category> getAllCategory();
    List<Category> searchCategory(String name);
    Category addCategory(Category category);
    Category editCategory(Category category);
    Category getCategory(Long id);
    void deleteCategory(Category category);
}
