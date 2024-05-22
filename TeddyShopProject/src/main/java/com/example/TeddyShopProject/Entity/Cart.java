package com.example.TeddyShopProject.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "carts")
public class Cart {
    @Id
    private String id;
    private String productID;
    private int quantity;

    public Cart() {

    }

    public Cart(String productID, int quantity) {
        this.productID = productID;
        this.quantity = quantity;
    }

    public String getId() {
        return id;
    }

    public String getProductID() {
        return productID;
    }

    public void setProductID(String productID) {
        this.productID = productID;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "Cart [id=" + id + ", productID=" + productID + ", quantity=" + quantity + "]";
    }

}
