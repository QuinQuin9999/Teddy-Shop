package com.example.TeddyShopProject.Entity;


import java.util.ArrayList;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "reviews")
public class Review {
    @Id 
    private String reviewId;
    private String productId;
    private String userId;
    private int rating;
    private String reviewContent;
    private Date reviewDate;
    private ArrayList<Feedback> feedback; 
    
    public Review() {
        this.feedback = new ArrayList<>();
    }

    public Review(String reviewId, String productId, String userId, int rating, String reviewContent, Date reviewDate, ArrayList<Feedback> feedback) {
        this.reviewId = reviewId;
        this.productId = productId;
        this.userId = userId;
        this.rating = rating;
        this.reviewContent = reviewContent;
        this.reviewDate = reviewDate;
        this.feedback = feedback != null ? feedback : new ArrayList<>();
    }

    public String getReviewId() {
        return reviewId;
    }

    public void setReviewId(String reviewId) {
        this.reviewId = reviewId;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getReviewContent() {
        return reviewContent;
    }

    public void setReviewContent(String reviewContent) {
        this.reviewContent = reviewContent;
    }

    public Date getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(Date reviewDate) {
        this.reviewDate = reviewDate;
    }

    public ArrayList<Feedback> getFeedback() {
        return feedback;
    }

    public void setFeedback(ArrayList<Feedback> feedback) {
        this.feedback = feedback;
    } 
    
    public void addFeedback(Feedback feedback) {
        if (this.feedback == null) {
            this.feedback = new ArrayList<>();
        }
        this.feedback.add(feedback);
    }
}
