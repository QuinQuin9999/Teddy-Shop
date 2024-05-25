package com.example.TeddyShopProject.Repository;

import com.example.TeddyShopProject.Entity.SubCategory;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SubCategoryRepo extends MongoRepository<SubCategory, String> {

}