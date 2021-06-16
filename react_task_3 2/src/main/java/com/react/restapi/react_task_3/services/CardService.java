package com.react.restapi.react_task_3.services;


import com.react.restapi.react_task_3.entities.Cards;

import java.util.List;

public interface CardService {
    List<Cards> getAllCards();
    List<Cards> searchCards(String name);
    Cards addCard(Cards card);
    Cards editCard(Cards card);
    Cards getCard(Long id);
    void deleteCard(Cards card);

}
