package com.example.TeddyShopProject.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.TeddyShopProject.Entity.Order;
import java.util.List;
import org.bson.types.ObjectId;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByUserInfo(ObjectId userInfo);
}
