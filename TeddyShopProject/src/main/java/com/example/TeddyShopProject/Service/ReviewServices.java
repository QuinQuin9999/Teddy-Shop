package com.example.TeddyShopProject.Service;

import com.example.TeddyShopProject.Entity.Feedback;
import com.example.TeddyShopProject.Entity.Product;
import com.example.TeddyShopProject.Entity.Review;
import com.example.TeddyShopProject.Repository.FeedbackRepo;
import com.example.TeddyShopProject.Repository.ReviewRepo;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewServices {

    @Autowired
    private ReviewRepo repo;
    
    @Autowired
    private FeedbackRepo fbRepo;

    public void saveOrUpdate(Review reviews) {
        repo.save(reviews);
    }

    public Review addFeedbackToReview(String reviewId, Feedback feedback) {
        Review review = repo.findById(reviewId).orElse(null);

        if (review == null) {
            throw new IllegalArgumentException("Không tìm thấy đánh giá với id: " + reviewId);
        }

        feedback.setFeedbackDate(new Date());  
        feedback = fbRepo.save(feedback);  

        if (review.getFeedback() == null) {
            review.setFeedback(new ArrayList<>());
        }
        review.addFeedback(feedback);
        return repo.save(review);
    }

    public void deleteReview(String reviewId) {
        repo.deleteById(reviewId);
    }

    public Iterable<Review> listAll() {
        return this.repo.findAll();
    }

    public Review getReviewById(String reviewId) {
        return repo.findById(reviewId).get();
    }

    public ArrayList<Review> getReviewsByProductId(String productId) {
        ArrayList<Review> list = new ArrayList<>();

        Iterable<Review> reviews = repo.findAll();
        for (Review review : reviews) {
            if (review.getProductId().equals(productId)) {
                list.add(review);
            }
        }
        return list;
    }

    public ArrayList<Review> getReviewsByUserId(String userId) {
        ArrayList<Review> list = new ArrayList<>();

        Iterable<Review> reviews = repo.findAll();
        for (Review review : reviews) {
            if (review.getUserId().equals(userId)) {
                list.add(review);
            }
        }
        return list;
    }

    public Review removeFeedbackFromReview(String reviewId, String feedbackId) {
        Review review = repo.findById(reviewId).orElse(null);

        if (review == null) {
            throw new IllegalArgumentException("Không tìm thấy đánh giá với ID: " + reviewId);
        }

        if (review.getFeedback() != null) {
            ArrayList<Feedback> updatedFeedbackList = new ArrayList<>();
            for (Feedback feedback : review.getFeedback()) {
                if (!feedback.getId().equals(feedbackId)) {
                    updatedFeedbackList.add(feedback);
                }
            }
            review.setFeedback(updatedFeedbackList);
        }

        return repo.save(review);
    }

}
