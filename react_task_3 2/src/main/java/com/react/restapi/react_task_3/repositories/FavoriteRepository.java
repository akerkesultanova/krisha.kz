package com.react.restapi.react_task_3.repositories;

import com.react.restapi.react_task_3.entities.Favorites;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface FavoriteRepository extends JpaRepository<Favorites,Long> {
    List<Favorites> findAllByUser_Id(Long id);
    Favorites findByAd_IdAndUser_Id(Long adId,Long userId);
}
