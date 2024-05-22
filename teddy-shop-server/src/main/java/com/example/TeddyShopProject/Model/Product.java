package com.example.TeddyShopProject.Model;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
public class Product {

    @Id
    private String _id;
    private String productName;
    private String productType;
    private String productImg;
    private Map<String, Double> productPrice;
    private int discount;
    private Map<String, Map<String, Integer>> countInStock;
    private Map<String, ArrayList<String>> description;

    public Product() {

    }

    public Product(String _id, String productName, String productType, String productImg,
            Map<String, Double> productPrice, int discount, Map<String, Map<String, Integer>> countInStock,
            Map<String, ArrayList<String>> description) {
        this._id = _id;
        this.productName = productName;
        this.productType = productType;
        this.productImg = productImg;
        this.productPrice = productPrice;
        this.discount = discount;
        this.countInStock = countInStock;
        this.description = description;
    }

    public String getId() {
        return _id;
    }

    public String getProductName() {
        return productName;
    }

    public String getProductType() {
        return productType;
    }

    public String getProductImg() {
        return productImg;
    }

    public Map<String, Double> getProductPrice() {
        return productPrice;
    }

    public int getDiscount() {
        return discount;
    }

    public Map<String, Map<String, Integer>> getCountInStock() {
        return countInStock;
    }

    public Map<String, ArrayList<String>> getDescription() {
        return description;
    }

    public void setId(String _id) {
        this._id = _id;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public void setProductImg(String productImg) {
        this.productImg = productImg;
    }

    public void setProductPrice(Map<String, Double> productPrice) {
        this.productPrice = productPrice;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public void setCountInStock(Map<String, Map<String, Integer>> countInStock) {
        this.countInStock = countInStock;
    }

    public void setDescription(Map<String, ArrayList<String>> description) {
        this.description = description;
    }

}