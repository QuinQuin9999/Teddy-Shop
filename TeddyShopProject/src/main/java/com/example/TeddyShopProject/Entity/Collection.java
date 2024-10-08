package com.example.TeddyShopProject.Entity;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "collections")
public class Collection {
    @Id
    private String id;
    // private String name;
    private ArrayList<Product> productList;

    public Collection() {

    }

    public Collection(String id, ArrayList<Product> productList) {
        this.id = id;
        this.productList = productList;
    }

    // public String getId() {
    // return id;
    // }

    public String getId() {
        return id;
    }

    // public void setName(String name) {
    // this.name = name;
    // }

    public ArrayList<Product> getProductList() {
        return productList;
    }

    public void setProductList(ArrayList<Product> productList) {
        this.productList = productList;
    }

}
