package com.react.restapi.react_task_3.repositories;

import com.react.restapi.react_task_3.entities.Pictures;
import com.react.restapi.react_task_3.entities.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface PictureRepository extends JpaRepository<Pictures,Long> {
    List<Pictures> findAllByAd_Id(Long id);
}
