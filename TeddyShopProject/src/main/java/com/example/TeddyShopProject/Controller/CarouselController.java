package com.example.TeddyShopProject.Controller;

import com.example.TeddyShopProject.Entity.Carousel;
import com.example.TeddyShopProject.Service.CarouselService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/carousel")
public class CarouselController {

    @Autowired
    private CarouselService carouselService;

    @PostMapping(value = "/save")
    public String saveOrUpdate(@RequestParam("file") MultipartFile file,
                               @RequestParam("fileName") String fileName) throws IOException {
        Carousel carousel = carouselService.saveOrUpdate(file, fileName);
        return carousel.getId();
    }

    @GetMapping(value = "/getAll")
    public Iterable<Carousel> getCarousels() {
        return carouselService.listAll();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCarousel(@PathVariable(name = "id") String _id) {
        carouselService.deleteCarousel(_id);
    }

    @GetMapping("/search/{id}")
    public Carousel getCarousel(@PathVariable(name = "id") String _id) {
        return carouselService.getCarouselById(_id);
    }

    @PutMapping("/edit/{id}")
    public Carousel editCarousel(@PathVariable(name = "id") String id,
                                 @RequestParam(value = "fileName", required = false) String fileName) {
        return carouselService.editCarousel(id, fileName);
    }
}
