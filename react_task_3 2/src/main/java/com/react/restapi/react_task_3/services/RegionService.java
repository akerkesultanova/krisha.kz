package com.react.restapi.react_task_3.services;

import com.react.restapi.react_task_3.entities.Region;
import java.util.List;

public interface RegionService {

    List<Region> getAllRegion();
    List<Region> searchRegion(String name);
    Region addRegion(Region region);
    Region editRegion(Region region);
    Region getRegion(Long id);
    void deleteRegion(Region region);
}

