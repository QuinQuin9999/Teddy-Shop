package com.example.Project.Service;

import com.example.Project.Entity.Feedback;
import com.example.Project.Repo.ReviewRepo;
import com.example.Project.Entity.Review;
import java.util.ArrayList;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewServices {
    
    @Autowired
    private ReviewRepo repo;

    public void saveOrUpdate(Review reviews) {
        repo.save(reviews);
    }

public Review addFeedbackToReview(String reviewId, Feedback feedback) {
    Review review = repo.findById(reviewId).orElse(null);

    if (review == null) {
        throw new IllegalArgumentException("Review not found for id: " + reviewId);
    }
    if (review.getFeedback() == null) {
        review.setFeedback(new ArrayList<>());
    }
    review.addFeedback(feedback); 
    return repo.save(review);
}

    public void deleteReview(String reviewId) {
        repo.deleteById(reviewId);
    }

    public Review getReviewById(String reviewId) {
        return repo.findById(reviewId).get();
    }

    public ArrayList<Review> getReviewsByProductId(String productId) {
        ArrayList<Review> list = new ArrayList<>();
        
        Iterable<Review> reviews = repo.findAll();
        for(Review review: reviews)
        {
            if(review.getProductId().equals(productId))
            {
                list.add(review);
            }
        }
        return list;
    }

    public ArrayList<Review> getReviewsByUserId(String userId) {       
        ArrayList<Review> list = new ArrayList<>(); 
        
        Iterable<Review> reviews = repo.findAll();
        for(Review review: reviews)
        {
            if(review.getUserId().equals(userId))
            {
                list.add(review);
            }
        }
        return list;
    }
    
    
}
