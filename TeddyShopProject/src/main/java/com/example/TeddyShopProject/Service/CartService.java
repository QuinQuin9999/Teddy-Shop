package com.example.TeddyShopProject.Service;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.TeddyShopProject.DTO.ApiResponse;
import com.example.TeddyShopProject.Entity.Cart;
import com.example.TeddyShopProject.Repository.CartRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public ApiResponse createCart(String id) {
        Cart createdCart = cartRepository.save(new Cart(id));
        if (createdCart != null) {
            return new ApiResponse("OK", "Success", createdCart);
        } else {
            return new ApiResponse("ERR", "Failed");
        }
    }

    public ApiResponse getCart(String id) {
        Cart cart = cartRepository.findById(id).orElse(null);
        if (cart == null) {
            return new ApiResponse("ERR", "The cart is not defined");
        }
        return new ApiResponse("OK", "SUCCESS", cart);
    }

    public ApiResponse updateCart(String id, ArrayList<Map<String, Object>> updateData) {
        Cart cart = cartRepository.findById(id).orElse(null);
        if (cart == null) {
            return new ApiResponse("ERR", "The cart is not defined");
        }
        cart.setCartItems(updateData);
        return new ApiResponse("OK", "SUCCESS", cartRepository.save(cart));
    }
}
