package com.react.restapi.react_task_3.services.impl;

import com.react.restapi.react_task_3.entities.Cards;
import com.react.restapi.react_task_3.repositories.CardRepository;
import com.react.restapi.react_task_3.services.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CardServiceImpl implements CardService {

    @Autowired
    private CardRepository cardRepository;



    @Override
    public List<Cards> getAllCards() {
        return cardRepository.findAll();
    }

    @Override
    public Cards addCard(Cards card) {
        return cardRepository.save(card);
    }

    @Override
    public Cards editCard(Cards card) {
        return cardRepository.save(card);
    }

    @Override
    public Cards getCard(Long id) {
        Optional<Cards> opt = cardRepository.findById(id);
        return opt.isPresent()?opt.get():null;
    }

    @Override
    public void deleteCard(Cards card) {
        cardRepository.delete(card);
    }

    @Override
    public List<Cards> searchCards(String name) {
        return cardRepository.findAllByNameIsStartingWith(name);
    }
}
