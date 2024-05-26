package com.example.TeddyShopProject.Entity;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "carts")
public class Cart {
    @Id
    private String id; // userId
    private ArrayList<Map<String, Object>> cartItems;

    public Cart() {

    }

    public Cart(String userId) {
        this.id = userId;
        this.cartItems = new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public ArrayList<Map<String, Object>> getCartItems() {
        return cartItems;
    }

    public void setCartItems(ArrayList<Map<String, Object>> cartItems) {
        this.cartItems = cartItems;
    }

}
