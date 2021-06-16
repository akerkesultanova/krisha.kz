package com.react.restapi.react_task_3.services.impl;

import com.react.restapi.react_task_3.entities.Category;
import com.react.restapi.react_task_3.repositories.CategoryRepository;
import com.react.restapi.react_task_3.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }

    @Override
    public List<Category> searchCategory(String name) {
        return null;
    }

    @Override
    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category editCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category getCategory(Long id) {
        return categoryRepository.getOne(id);
    }

    @Override
    public void deleteCategory(Category category) {
        categoryRepository.delete(category);
    }
}
