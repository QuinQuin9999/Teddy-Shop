package com.example.TeddyShopProject.Repo;

import com.example.TeddyShopProject.Entity.Review;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReviewRepo extends MongoRepository<Review, String>{
}
