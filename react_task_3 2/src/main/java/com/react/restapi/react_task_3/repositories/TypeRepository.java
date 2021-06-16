package com.react.restapi.react_task_3.repositories;

import com.react.restapi.react_task_3.entities.Region;
import com.react.restapi.react_task_3.entities.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface TypeRepository extends JpaRepository<Type,Long> {
}
