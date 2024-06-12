package com.example.TeddyShopProject.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.TeddyShopProject.DTO.ApiResponse;
import com.example.TeddyShopProject.DTO.ErrorResponse;
import com.example.TeddyShopProject.Entity.Conversation;
import com.example.TeddyShopProject.Service.ConversationService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/conversation")

public class CoversationController {

    @Autowired
    private ConversationService conversationService;

    @GetMapping("/get-all")
    public ResponseEntity<Object> getAllConversation() {
        try {
            ApiResponse response = conversationService.getAllConversation();
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(e.getMessage(), null));
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Object> getConversationByUserId(@PathVariable("userId") String userId) {
        try {
            ApiResponse response = conversationService.getConversationByUserId(userId);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(e.getMessage(), null));
        }
    }

    @PostMapping("/message/{userId}")
    public ResponseEntity<Object> createMessage(@PathVariable("userId") String userId, @RequestBody Map<String, Object> obj) {
        try {
            String senderId = obj.get("senderId").toString();
            String messageContent = obj.get("messageContent").toString();
            ApiResponse response = conversationService.createMessage(userId, senderId, messageContent);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(e.getMessage(), null));
        }
    }
}
