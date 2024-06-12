package com.example.TeddyShopProject.Service;

import java.util.List;
import java.util.ArrayList;

// import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.TeddyShopProject.DTO.ApiResponse;
import com.example.TeddyShopProject.Entity.Conversation;
import com.example.TeddyShopProject.Entity.User;
import com.example.TeddyShopProject.Repository.ConversationRepository;
import com.example.TeddyShopProject.Repository.UserRepository;
import com.example.TeddyShopProject.Util.Message;

@Service
public class ConversationService {

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private UserRepository userRepository;

    public ApiResponse getAllConversation() {
        List<Conversation> conversations = conversationRepository.findAll();
        return new ApiResponse("OK", "SUCCESS", conversations);
    }

    public ApiResponse getConversationByUserId(String userId) {
        Conversation conversation = conversationRepository.findById(userId).orElse(null);
        if (conversation == null) {
            return new ApiResponse("ERR", "The conversation is not defined");
        }
        return new ApiResponse("OK", "SUCCESS", conversation);
    }

    public ApiResponse createMessage(String userId, String senderId, String messageContent) {
        Conversation conversation = conversationRepository.findById(userId).orElse(null);
        if (conversation == null) {
            User user = userRepository.findById(userId).orElse(null);
            String username = user.getUsername();
            conversation = new Conversation(userId, username);
            conversation.addMessage(new Message(senderId, messageContent));
        } else {
            conversation.addMessage(new Message(senderId, messageContent));
        }
        return new ApiResponse("OK", "SUCCESS", conversationRepository.save(conversation));
    }
}
