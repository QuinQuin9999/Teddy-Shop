package com.example.TeddyShopProject.Util;

import java.util.Date;
import java.time.LocalDateTime;

public class Message {

    private String content;
    private String senderId;
    private LocalDateTime date;
    public Message() {}
    
    // public Message(String content, String senderId, Date date) {
    //     this.content = content;
    //     this.senderId = senderId;
    //     this.date = date;
    // }
    public Message(String senderId, String content) {
        this.content = content;
        this.senderId = senderId;
        this.date = LocalDateTime.now();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}
