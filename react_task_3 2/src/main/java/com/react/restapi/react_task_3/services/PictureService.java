package com.react.restapi.react_task_3.services;

import com.react.restapi.react_task_3.entities.Pictures;
import com.react.restapi.react_task_3.entities.Type;

import java.util.List;

public interface PictureService {
    List<Pictures> getAllPictures();
    List<Pictures> getAllByAd(Long id);
    Pictures addPictures(Pictures pictures);
    Pictures editPictures(Pictures pictures);
    Pictures getPictures(Long id);
    void deletePictures(Pictures pictures);

}
