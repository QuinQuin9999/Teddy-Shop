package com.example.TeddyShopProject.Controller;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.TeddyShopProject.DTO.ApiResponse;
import com.example.TeddyShopProject.DTO.ErrorResponse;
import com.example.TeddyShopProject.Service.CartService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/cart")

public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping("/create/{id}")
    public ResponseEntity<Object> createCart(@PathVariable("id") String userId) {
        try {
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ErrorResponse("The userId is required", "ERR"));
            }
            ApiResponse res = cartService.createCart(userId);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(e.getMessage(), null));
        }
    }

    @GetMapping("getCart/{id}")
    public ResponseEntity<Object> getCart(@PathVariable("id") String id) {
        try {
            if (id == null) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ErrorResponse("The id is required", "ERR"));
            }
            ApiResponse res = cartService.getCart(id);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(e.getMessage(), null));
        }
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Object> updateCart(@PathVariable("id") String id, @RequestBody Map<String, Object> obj) {
        try {
            if (id == null) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ErrorResponse("The userId is required", "ERR"));
            }
            if (obj == null) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ErrorResponse("The input is required", "ERR"));
            }
            ArrayList<Map<String, Object>> items = (ArrayList<Map<String, Object>>) obj.get("cartItems");
            ApiResponse res = cartService.updateCart(id, items);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(e.getMessage(), null));
        }
    }
}
