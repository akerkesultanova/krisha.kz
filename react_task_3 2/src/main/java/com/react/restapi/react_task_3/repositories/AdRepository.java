package com.react.restapi.react_task_3.repositories;

import com.react.restapi.react_task_3.entities.Ad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface AdRepository extends JpaRepository<Ad,Long> {
    List<Ad> findAllByCategory_IdAndType_IdAndRegion_IdAndRoomGreaterThanEqualAndPriceBetweenAndImageNotLike(Long category_id, Long type_id, Long region_id, int room, Double price, Double price2,String image);
    List<Ad> findAllByCategory_IdAndType_IdAndRegion_IdAndRoomGreaterThanEqualAndPriceBetweenAndImageLike(Long category_id, Long type_id, Long region_id, int room, Double price, Double price2,String image);
    List<Ad> findAllByUser_Id(Long id);
}
