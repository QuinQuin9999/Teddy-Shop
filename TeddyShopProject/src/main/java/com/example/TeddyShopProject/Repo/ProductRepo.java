package com.example.TeddyShopProject.Repo;

import com.example.TeddyShopProject.Entity.Product;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepo extends MongoRepository<Product, String>{
}
