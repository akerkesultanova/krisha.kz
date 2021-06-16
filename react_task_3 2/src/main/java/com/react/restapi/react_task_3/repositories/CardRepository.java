package com.react.restapi.react_task_3.repositories;

import com.react.restapi.react_task_3.entities.Cards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface CardRepository extends JpaRepository<Cards,Long> {
    List<Cards> findAllByNameIsStartingWith(String name);
}
