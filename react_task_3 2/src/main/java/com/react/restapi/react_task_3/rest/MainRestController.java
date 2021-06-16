package com.react.restapi.react_task_3.rest;

import com.react.restapi.react_task_3.dto.UserDTO;
import com.react.restapi.react_task_3.entities.*;
import com.react.restapi.react_task_3.repositories.RolesRepository;
import com.react.restapi.react_task_3.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api")
public class MainRestController {



    @Autowired
    private CardService cardService;

    @Autowired
    private FavoriteService favoriteService;

    @Autowired
    private UserService userService;

    @Autowired
    private RolesRepository rolesRepository;

    @Autowired
    private CardTasksService cardTasksService;

    @Autowired
     private AdService adService;

    @Autowired
    private RegionService regionService;

    @Autowired
    private  TypeService typeService;

    @Autowired
    private PictureService pictureService;

    @Autowired
     private CategoryService categoryService;

    @GetMapping(value = "/allCards")
    public ResponseEntity<?> getAllCards(){
        List<Cards> cards = cardService.getAllCards();
        return new ResponseEntity<>(cards, HttpStatus.OK);
    }

    @GetMapping(value = "/searchCards")
    public ResponseEntity<?> getSearchCards(@RequestParam(name = "name")String name){
        List<Cards> cards = cardService.searchCards(name);
        return new ResponseEntity<>(cards, HttpStatus.OK);
    }

    @GetMapping(value = "/allTasks")
    public ResponseEntity<?> getAllTasks(@RequestParam(name = "id")Long cardId){
        List<CardTasks> tasks = cardTasksService.getAllTasks(cardId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }



    @PostMapping(value = "/addCard")
    public ResponseEntity<?> addCard(@RequestBody Cards card){
        cardService.addCard(card);
        return ResponseEntity.ok(card);
    }

    @PostMapping(value = "/addTask")
    public ResponseEntity<?> addTask(@RequestBody CardTasks task){
        cardTasksService.addTask(task);
        return ResponseEntity.ok(task);
    }

    @GetMapping(value = "/getCard/{id}")
    public ResponseEntity<?> getCard(@PathVariable(name = "id") Long id){
        Cards card = cardService.getCard(id);
        if(card!=null){
            return ResponseEntity.ok(card);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(value = "/getTask/{id}")
    public ResponseEntity<?> getTask(@PathVariable(name = "id") Long id){
        CardTasks task = cardTasksService.getTask(id);
        if(task!=null){
            return ResponseEntity.ok(task);
        }else{
            return ResponseEntity.notFound().build();
        }
    }


    @PutMapping(value = "/saveCard")
    public ResponseEntity<?> saveCard(@RequestBody Cards card){
        cardService.editCard(card);
        return ResponseEntity.ok(card);
    }

    @PutMapping(value = "/saveTask")
    public ResponseEntity<?> saveTask(@RequestBody CardTasks task){
        cardTasksService.editTask(task);
        return ResponseEntity.ok(task);
    }


    @DeleteMapping(value = "/deleteCard")
    public ResponseEntity<?> deleteCard(@RequestBody Cards card){
        Cards checkCard = cardService.getCard(card.getId());
        if(checkCard!=null){
            cardService.deleteCard(checkCard);
            return ResponseEntity.ok(checkCard);
        }
        return ResponseEntity.ok(card);
    }


    @DeleteMapping(value = "/deleteTask")
    public ResponseEntity<?> deleteTask(@RequestBody CardTasks task){
        CardTasks checkTask = cardTasksService.getTask(task.getId());
        if(checkTask!=null){
            cardTasksService.deleteTask(checkTask);
            return ResponseEntity.ok(checkTask);
        }
        return ResponseEntity.ok(task);
    }

    @PostMapping(value = "/register")
    public ResponseEntity<?> registr(@RequestBody Users user) {
        System.out.println(user.getUsername());
        Users new_user =  userService.getUserByEmail(user.getUsername());
        if(new_user!=null){
            return ResponseEntity.notFound().build();
        }
        else{

            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            List<Roles> roles = new ArrayList<>();
            roles.add(rolesRepository.getOne(3L));
            user.setRoles(roles);
            userService.saveUser(user);
            return ResponseEntity.ok().build();

        }
    }



    @GetMapping(value = "/profile")
    public ResponseEntity<?> profilePage(){
        Users user = getUser();
        return new ResponseEntity<>(new UserDTO(user.getId(), user.getEmail(),user.getFullName(), user.getRoles()), HttpStatus.OK);
    }

    private Users getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!(authentication instanceof AnonymousAuthenticationToken)){
            Users user = (Users) authentication.getPrincipal();
            return user;
        }
        return null;
    }


    @PutMapping(value = "/updateProfile")
    public ResponseEntity<?> updateProfile(@RequestBody Users user){
        Users u =  userService.getUserByEmail(user.getUsername());
        if(u!=null){
            u.setFullName(user.getFullName());
            userService.saveUser(u);
            return ResponseEntity.ok(u);
        }
        return ResponseEntity.notFound().build();
    }




    @PutMapping(value = "/updatePassword")
    public ResponseEntity<?> updatePassword(@RequestBody UserDTO user){
        Users u =  userService.getUserByEmail(user.getEmail());
        BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();
        if(!bCrypt.matches(user.getPassword(),u.getPassword())){
            return ResponseEntity.notFound().build();
        }
        else{
            u.setPassword(bCrypt.encode(user.getNewPassword()));
            userService.saveUser(u);
            return ResponseEntity.ok(u);
        }
    }



    ////////////////////////////////////////////

    @GetMapping(value = "/allCategories")
    public ResponseEntity<?> allCategories(){
        List<Category> categories = categoryService.getAllCategory();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @PostMapping(value = "/addCategory")
    public ResponseEntity<?> addCategory(@RequestBody Category category){
        categoryService.addCategory(category);
        return ResponseEntity.ok(category);
    }

    @PutMapping(value = "/editCategory")
    public ResponseEntity<?> editCategory(@RequestBody Category category){
        categoryService.editCategory(category);
        return ResponseEntity.ok(category);
    }

    @DeleteMapping(value = "/deleteCategory")
    public ResponseEntity<?> deleteCategory(@RequestBody Category category){
        categoryService.deleteCategory(category);
        return ResponseEntity.ok(category);
    }


    //////////////////////////////////////////////


    @GetMapping(value = "/allTypes")
    public ResponseEntity<?> allTypes(){
        List<Type> types = typeService.getAllType();
        return new ResponseEntity<>(types, HttpStatus.OK);
    }

    @PostMapping(value = "/addType")
    public ResponseEntity<?> addType(@RequestBody Type type){
        typeService.addType(type);
        return ResponseEntity.ok(type);
    }

    @PutMapping(value = "/editType")
    public ResponseEntity<?> editType(@RequestBody Type type){
        typeService.editType(type);
        return ResponseEntity.ok(type);
    }

    @DeleteMapping(value = "/deleteType")
    public ResponseEntity<?> deleteType(@RequestBody Type type){
        typeService.deleteType(type);
        return ResponseEntity.ok(type);
    }


    //////////////////////////////////////////////////////////

    @GetMapping(value = "/allRegions")
    public ResponseEntity<?> allRegions(){
        List<Region> regions = regionService.getAllRegion();
        return new ResponseEntity<>(regions, HttpStatus.OK);
    }

    @PostMapping(value = "/addRegion")
    public ResponseEntity<?> addRegion(@RequestBody Region region){
        regionService.addRegion(region);
        return ResponseEntity.ok(region);
    }

    @PutMapping(value = "/editRegion")
    public ResponseEntity<?> editRegion(@RequestBody Region region){
        regionService.editRegion(region);
        return ResponseEntity.ok(region);
    }

    @DeleteMapping(value = "/deleteRegion")
    public ResponseEntity<?> deleteRegion(@RequestBody Region region){
        regionService.deleteRegion(region);
        return ResponseEntity.ok(region);

    }


    //////////////////////////////////////////////////////////////

    @GetMapping(value = "/allRoles")
    public ResponseEntity<?> allRoles(){
        List<Roles> roles = rolesRepository.findAll();
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }

    @PostMapping(value = "/addRole")
    public ResponseEntity<?> addRole(@RequestBody Roles role){
        rolesRepository.save(role);
        return ResponseEntity.ok(role);
    }

    @PutMapping(value = "/editRole")
    public ResponseEntity<?> editRole(@RequestBody Roles role){
        rolesRepository.save(role);
        return ResponseEntity.ok(role);
    }

    @DeleteMapping(value = "/deleteRole")
    public ResponseEntity<?> deleteRegion(@RequestBody Roles role){
        rolesRepository.delete(role);
        return ResponseEntity.ok(role);

    }


    /////////////////////////////////////////////////////////////////



    @GetMapping(value = "/allAds")
    public ResponseEntity<?> allAds(){
        List<Ad> ads = adService.getAllAd();
        return new ResponseEntity<>(ads, HttpStatus.OK);
    }

    @GetMapping(value = "/myAds")
    public ResponseEntity<?> myAds(){
        Users user = getUser();
        List<Ad> ads = adService.getAllAdsByUser(user.getId());
        return new ResponseEntity<>(ads, HttpStatus.OK);
    }


    @GetMapping(value = "/filterAds")
    public ResponseEntity<?> allAds(@RequestParam(name = "cat_id")Long cat_id,
                                    @RequestParam(name = "type_id")Long type_id,
                                    @RequestParam(name = "region_id")Long region_id,
                                    @RequestParam(name = "room")double room,
                                    @RequestParam(name = "from")String from,
                                    @RequestParam(name = "to")String to,
                                    @RequestParam(name = "image")boolean image
                                    ){
        List<Ad> ads = adService.getAllAd();
        if(!from.equals("") && !to.equals("")){
            Double f = Double.parseDouble(from);
            Double t = Double.parseDouble(to);

            if(image){
                if(f<t){
                    ads = adService.filter1(cat_id,type_id,region_id, (int) room,f,t,"https://parilka.store/images/no-image.png");
                }
            }else{
                if(f<t){
                    ads = adService.filter2(cat_id,type_id,region_id, (int) room,f,t,"https://parilka.store/images/no-image.png");
                }
            }
        }

        return new ResponseEntity<>(ads, HttpStatus.OK);
    }

    @GetMapping(value = "/favorites")
    public ResponseEntity<?> favorites(){
        Users user = getUser();
        List<Favorites> favoritesList = favoriteService.getAllFavoritesByUser(user.getId());
        return new ResponseEntity<>(favoritesList, HttpStatus.OK);
    }

    @PostMapping(value = "/addAd")
    public ResponseEntity<?> addAd(@RequestBody Ad ad){
        Users user = getUser();
        ad.setCategory(categoryService.getCategory(ad.getCategory().getId()));
        ad.setType(typeService.getType(ad.getType().getId()));
        ad.setRegion(regionService.getRegion(ad.getRegion().getId()));
        ad.setUser(user);
        if(ad.getImage().equals("")){
            ad.setImage("https://parilka.store/images/no-image.png");
        }
        adService.addAd(ad);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/editPost")
    public ResponseEntity<?> editPost(@RequestBody Ad ad){
        Users user = getUser();
        ad.setCategory(categoryService.getCategory(ad.getCategory().getId()));
        ad.setType(typeService.getType(ad.getType().getId()));
        ad.setRegion(regionService.getRegion(ad.getRegion().getId()));
        ad.setUser(user);
        if(ad.getImage().equals("")){
            ad.setImage("https://parilka.store/images/no-image.png");
        }
        adService.addAd(ad);
        return ResponseEntity.ok().build();
    }


    @PostMapping(value = "/addToFavorite")
    public ResponseEntity<?> addToFavorite(@RequestBody Favorites favorites){
        favoriteService.addFavorite(favorites);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/editAd")
    public ResponseEntity<?> editAd(@RequestBody Ad ad){
        adService.editAd(ad);
        return ResponseEntity.ok(ad);
    }

    @DeleteMapping(value = "/deleteAd")
    public ResponseEntity<?> deleteAd(@RequestBody Ad ad){
        adService.deleteAd(ad);
        return ResponseEntity.ok(ad);

    }

    @GetMapping(value = "/getPost/{id}")
    public ResponseEntity<?> getAd(@PathVariable(name = "id") Long id){
        Ad ad = adService.getAd(id);
        if(ad!=null){
            return ResponseEntity.ok(ad);
        }else{
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping(value = "/getFavorite")
    public ResponseEntity<?> getFavorite(@RequestParam(name = "adId") Long adId){
        Users user = getUser();
        Favorites favorites = favoriteService.getFavoriteByUserIdAndAdId(adId,user.getId());
        if(favorites!=null){
            return ResponseEntity.ok(favorites);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(value = "/deleteFromFavorites/{id}")
    public ResponseEntity<?> deleteFromFavorites(@PathVariable(name = "id")Long id){
        Favorites favorites1 = favoriteService.getFavorite(id);
        if(favorites1!=null){
            favoriteService.deleteFavorite(favorites1);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();

    }


    @PostMapping(value = "/addImage")
    public ResponseEntity<?> addImage(@RequestBody Pictures pictures){

        pictureService.addPictures(pictures);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/pictures")
    public ResponseEntity<?> pictures(@RequestParam(name = "id")Long id){
        List<Pictures> pictures = pictureService.getAllByAd(id);
        return new ResponseEntity<>(pictures, HttpStatus.OK);
    }
}