package com.example.Project.Repo;

import com.example.Project.Entity.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepo extends MongoRepository<Category, String>{
    
}