package com.react.restapi.react_task_3.repositories;

import com.react.restapi.react_task_3.entities.CardTasks;
import com.react.restapi.react_task_3.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface CategoryRepository extends JpaRepository<Category,Long> {
}
