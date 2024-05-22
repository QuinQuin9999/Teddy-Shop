package com.example.Project.Repo;

import com.example.Project.Entity.Product;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepo extends MongoRepository<Product, String>{
}
