package com.react.restapi.react_task_3.services;

import com.react.restapi.react_task_3.entities.CardTasks;

import java.util.List;

public interface CardTasksService {
    List<CardTasks> getAllTasks(Long id);
    CardTasks addTask(CardTasks cardTask);
    CardTasks editTask(CardTasks cardTask);
    CardTasks getTask(Long id);
    void deleteTask(CardTasks cardTask);
}
