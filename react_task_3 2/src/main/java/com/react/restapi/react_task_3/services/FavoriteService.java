package com.react.restapi.react_task_3.services;

import com.react.restapi.react_task_3.entities.Cards;
import com.react.restapi.react_task_3.entities.Favorites;

import java.util.List;

public interface FavoriteService {
    List<Favorites> getAllFavorites();
    List<Favorites> getAllFavoritesByUser(Long id);
    Favorites addFavorite(Favorites favorite);
    Favorites editFavorite(Favorites favorite);
    Favorites getFavorite(Long id);
    Favorites getFavoriteByUserIdAndAdId(Long adId,Long userId);
    void deleteFavorite(Favorites favorite);

}
