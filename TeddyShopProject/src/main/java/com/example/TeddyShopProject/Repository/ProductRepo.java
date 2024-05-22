package com.example.TeddyShopProject.Repository;

import com.example.TeddyShopProject.Entity.Product;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepo extends MongoRepository<Product, String> {
}
