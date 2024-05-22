package com.example.TeddyShopProject.Controller;

import com.example.TeddyShopProject.Entity.Feedback;
import com.example.TeddyShopProject.Service.ReviewServices;
import com.example.TeddyShopProject.Entity.Review;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/review")
public class ReviewController {
    
    @Autowired
    private ReviewServices reviewServices;
    
    //Thêm review mới
    @PostMapping(value= "/save")
    private String saveReview(@RequestBody Review reviews)
    {
        reviewServices.saveOrUpdate(reviews);
        return reviews.getReviewId();
    }
    
    //Thêm phản hồi vào review
    @PostMapping("/feedback/{reviewId}")
    private Review addFeedbackToReview(@PathVariable String reviewId, @RequestBody Feedback feedback) {
        return reviewServices.addFeedbackToReview(reviewId, feedback);
    }
    
    // Cập nhật một review
    @PutMapping("/edit/{reviewId}")
    private Review updateReview(@RequestBody Review review, @PathVariable String reviewId) {
        review.setReviewId(reviewId);
        reviewServices.saveOrUpdate(review);
        return review;
    }
    
    // Xóa một review
    @DeleteMapping("/delete/{reviewId}")
    private void deleteReview(@PathVariable String reviewId) {
        reviewServices.deleteReview(reviewId);
    }
    
    // Lấy review theo ID
    @GetMapping("/search/{reviewId}")
    private Review getReviewById(@PathVariable String reviewId) {
        return reviewServices.getReviewById(reviewId);
    }
    
    // Lấy tất cả review của một sản phẩm
    @GetMapping("/searchByProduct/{productId}")
    private ArrayList<Review> getReviewsByProductId(@PathVariable String productId) {
        return reviewServices.getReviewsByProductId(productId);
    }
    
    // Lấy tất cả review của một người dùng
    @GetMapping("/searchByUser/{userId}")
    private ArrayList<Review> getReviewsByUserId(@PathVariable String userId) {
        return reviewServices.getReviewsByUserId(userId);
    }

}
