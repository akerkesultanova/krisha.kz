package com.react.restapi.react_task_3.services.impl;

import com.react.restapi.react_task_3.entities.Pictures;
import com.react.restapi.react_task_3.repositories.PictureRepository;
import com.react.restapi.react_task_3.services.PictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PictureServiceImpl implements PictureService {

    @Autowired
    private PictureRepository pictureRepository;

    @Override
    public List<Pictures> getAllPictures() {
        return pictureRepository.findAll();
    }

    @Override
    public Pictures addPictures(Pictures pictures) {
        return pictureRepository.save(pictures);
    }

    @Override
    public Pictures editPictures(Pictures pictures) {
        return pictureRepository.save(pictures);
    }

    @Override
    public Pictures getPictures(Long id) {
        return pictureRepository.getOne(id);
    }

    @Override
    public void deletePictures(Pictures pictures) {
        pictureRepository.delete(pictures);
    }

    @Override
    public List<Pictures> getAllByAd(Long id) {
        return pictureRepository.findAllByAd_Id(id);
    }
}
