package com.example.TeddyShopProject.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.TeddyShopProject.Entity.Cart;

@Repository
public interface CartRepository extends MongoRepository<Cart, String> {

}
