package com.react.restapi.react_task_3.services;

import com.react.restapi.react_task_3.entities.Ad;

import java.util.List;

public interface AdService {
    List<Ad> getAllAd();
    List<Ad> searchAd(String name);
    Ad addAd(Ad ad);
    Ad editAd(Ad ad);
    Ad getAd(Long id);
    void deleteAd(Ad ad);
    List<Ad> filter1(Long cat_id,Long type_id,Long region_id, int room,double price1,double price2,String image);
    List<Ad> filter2(Long cat_id,Long type_id,Long region_id, int room,double price1,double price2,String image);
    List<Ad> getAllAdsByUser(Long id);
}

