package com.react.restapi.react_task_3.services.impl;

import com.react.restapi.react_task_3.entities.Region;
import com.react.restapi.react_task_3.repositories.RegionRepository;
import com.react.restapi.react_task_3.services.RegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegionServiceImpl implements RegionService {

    @Autowired
    private RegionRepository regionRepository;

    @Override
    public List<Region> getAllRegion() {
        return regionRepository.findAll();
    }

    @Override
    public List<Region> searchRegion(String name) {
        return null;
    }

    @Override
    public Region addRegion(Region region) {
        return regionRepository.save(region);
    }

    @Override
    public Region editRegion(Region region) {
        return regionRepository.save(region);
    }

    @Override
    public Region getRegion(Long id) {
        return regionRepository.getOne(id);
    }

    @Override
    public void deleteRegion(Region region) {
        regionRepository.delete(region);
    }
}
