package com.example.TeddyShopProject.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.TeddyShopProject.Entity.Feedback;

public interface FeedbackRepo extends MongoRepository<Feedback, String> {
}
