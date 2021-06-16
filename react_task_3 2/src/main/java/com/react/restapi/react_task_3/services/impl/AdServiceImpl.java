package com.react.restapi.react_task_3.services.impl;


import com.react.restapi.react_task_3.entities.Ad;
import com.react.restapi.react_task_3.repositories.AdRepository;
import com.react.restapi.react_task_3.services.AdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdServiceImpl implements AdService {

    @Autowired
    private AdRepository adRepository;

    @Override
    public List<Ad> getAllAd() {
        return adRepository.findAll();
    }

    @Override
    public List<Ad> searchAd(String name) {
        return null;
    }

    @Override
    public Ad addAd(Ad ad) {
        return adRepository.save(ad);
    }

    @Override
    public Ad editAd(Ad ad) {
        return adRepository.save(ad);
    }

    @Override
    public Ad getAd(Long id) {
        Optional<Ad> opt = adRepository.findById(id);
        return opt.isPresent()?opt.get():null;
    }

    @Override
    public void deleteAd(Ad ad) {
        adRepository.delete(ad);
    }


    @Override
    public List<Ad> filter1(Long cat_id, Long type_id, Long region_id, int room, double price1, double price2,String image) {
        return adRepository.findAllByCategory_IdAndType_IdAndRegion_IdAndRoomGreaterThanEqualAndPriceBetweenAndImageNotLike(cat_id,type_id,region_id,room,price1,price2,image);
    }

    @Override
    public List<Ad> filter2(Long cat_id, Long type_id, Long region_id, int room, double price1, double price2,String image) {
        return adRepository.findAllByCategory_IdAndType_IdAndRegion_IdAndRoomGreaterThanEqualAndPriceBetweenAndImageLike(cat_id,type_id,region_id,room,price1,price2,image);
    }

    @Override
    public List<Ad> getAllAdsByUser(Long id) {
        return adRepository.findAllByUser_Id(id);
    }
}
