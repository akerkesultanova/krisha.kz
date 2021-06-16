package com.react.restapi.react_task_3.services.impl;

import com.react.restapi.react_task_3.entities.Favorites;
import com.react.restapi.react_task_3.repositories.FavoriteRepository;
import com.react.restapi.react_task_3.services.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteServiceImpl implements FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Override
    public List<Favorites> getAllFavorites() {
        return favoriteRepository.findAll();
    }

    @Override
    public Favorites getFavoriteByUserIdAndAdId(Long adId, Long userId) {
        return favoriteRepository.findByAd_IdAndUser_Id(adId,userId);
    }

    @Override
    public List<Favorites> getAllFavoritesByUser(Long id) {
        return favoriteRepository.findAllByUser_Id(id);
    }

    @Override
    public Favorites addFavorite(Favorites favorite) {
        return favoriteRepository.save(favorite);
    }

    @Override
    public Favorites editFavorite(Favorites favorite) {
        return favoriteRepository.save(favorite);
    }

    @Override
    public Favorites getFavorite(Long id) {
        return favoriteRepository.getOne(id);
    }

    @Override
    public void deleteFavorite(Favorites favorite) {
            favoriteRepository.delete(favorite);
    }
}
