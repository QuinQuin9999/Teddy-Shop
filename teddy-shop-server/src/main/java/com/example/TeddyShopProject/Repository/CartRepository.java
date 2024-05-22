package com.example.TeddyShopProject.Repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.TeddyShopProject.Model.Cart;

@Repository
public interface CartRepository extends MongoRepository<Cart, String> {
    Optional<Cart> findByProductID(String productID);

    void deleteByProductID(String productID);
}
