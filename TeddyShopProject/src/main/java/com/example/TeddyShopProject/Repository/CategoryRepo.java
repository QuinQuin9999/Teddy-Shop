package com.example.TeddyShopProject.Repository;

import com.example.TeddyShopProject.Entity.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepo extends MongoRepository<Category, String> {

}