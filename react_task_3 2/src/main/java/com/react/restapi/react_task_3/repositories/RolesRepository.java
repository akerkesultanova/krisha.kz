package com.react.restapi.react_task_3.repositories;

import com.react.restapi.react_task_3.entities.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface RolesRepository extends JpaRepository<Roles,Long> {
}
