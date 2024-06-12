package com.example.TeddyShopProject.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.TeddyShopProject.Entity.Conversation;

@Repository
public interface ConversationRepository extends MongoRepository<Conversation, String> {
    
}
