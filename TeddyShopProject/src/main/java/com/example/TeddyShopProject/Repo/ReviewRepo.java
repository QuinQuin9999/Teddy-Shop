package com.example.Project.Repo;

import com.example.Project.Entity.Review;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReviewRepo extends MongoRepository<Review, String>{
}
