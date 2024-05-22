package com.example.TeddyShopProject.Entity;


import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "categories")
public class Category {

    @Id
    private String _id;
    private String categoryName;
    private String href;
    private ArrayList<Product> list;

    public Category() {
        this.list = new ArrayList<>();
    }
    
    public Category(String _id, String categoryName, ArrayList<Product> list) {
        this._id = _id;
        this.categoryName = categoryName;
        this.list = list != null ? list : new ArrayList<>();
    }

    public String getId() {
        return _id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public ArrayList<Product> getList() {
        return list;
    }

    public String getHref() {
        return href;
    }

    public void setId(String _id) {
        this._id = _id;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public void setHref(String href) {
        this.href = href;
    }

    public void setList(ArrayList<Product> list) {
        this.list = list;
    }
    
    public void addProduct(Product product) {
        this.list.add(product);
    }
    
}