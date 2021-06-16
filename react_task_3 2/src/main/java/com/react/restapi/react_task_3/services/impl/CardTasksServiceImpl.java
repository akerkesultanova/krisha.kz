package com.react.restapi.react_task_3.services.impl;

import com.react.restapi.react_task_3.entities.CardTasks;
import com.react.restapi.react_task_3.repositories.CardTasksRepository;
import com.react.restapi.react_task_3.services.CardTasksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CardTasksServiceImpl implements CardTasksService {

    @Autowired
    private CardTasksRepository cardTasksRepository;



    @Override
    public List<CardTasks> getAllTasks(Long id) {
        return cardTasksRepository.findAllByCard_Id(id);
    }

    @Override
    public CardTasks addTask(CardTasks cardTask) {
        return cardTasksRepository.save(cardTask);
    }

    @Override
    public CardTasks editTask(CardTasks cardTask) {
        return cardTasksRepository.save(cardTask);
    }

    @Override
    public CardTasks getTask(Long id) {
        Optional<CardTasks> opt = cardTasksRepository.findById(id);
        return opt.isPresent()?opt.get():null;
    }

    @Override
    public void deleteTask(CardTasks cardTask) {
        cardTasksRepository.delete(cardTask);
    }
}
