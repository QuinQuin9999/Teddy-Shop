package com.example.TeddyShopProject.Repository;

import com.example.TeddyShopProject.Entity.Carousel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CarouselRepo extends MongoRepository<Carousel, String> {

}