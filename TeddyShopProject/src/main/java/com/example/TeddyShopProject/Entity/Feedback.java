package com.example.TeddyShopProject.Entity;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "feedbacks")
public class Feedback {
    private String userId;
    private String comment;
    private Date feedbackDate;

    public Feedback(String userId, String comment, Date feedbackDate) {
        this.userId = userId;
        this.comment = comment;
        this.feedbackDate = feedbackDate;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Date getFeedbackDate() {
        return feedbackDate;
    }

    public void setFeedbackDate(Date feedbackDate) {
        this.feedbackDate = feedbackDate;
    }
}