package com.example.TeddyShopProject.Repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.TeddyShopProject.Model.Collection;

@Repository
public interface CollectionRepository extends MongoRepository<Collection, String> {
    Optional<Collection> findByName(String name);
}