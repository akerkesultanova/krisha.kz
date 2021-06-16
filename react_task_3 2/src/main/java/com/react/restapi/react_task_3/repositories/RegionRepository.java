package com.react.restapi.react_task_3.repositories;


import com.react.restapi.react_task_3.entities.CardTasks;
import com.react.restapi.react_task_3.entities.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface RegionRepository extends JpaRepository<Region,Long> {
}
