package com.example.TeddyShopProject.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.example.TeddyShopProject.Util.Message;
import java.util.ArrayList;

@Document(collection = "conversations")
public class Conversation {

    @Id
    private String id;
    private String username;
    // private List<String> participants;
    private ArrayList<Message> messages;

    public Conversation(String id, String username) {
        this.id = id;
        this.username = username;
        this.messages = new ArrayList<Message> ();
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    // public ArrayList<String> getParticipants() {
    //     return participants;
    // }

    // public void setParticipants(ArrayList<String> participants) {
    //     this.participants = participants;
    // }

    public ArrayList<Message> getMessages() {
        return messages;
    }

    public void setMessages(ArrayList<Message> messages) {
        this.messages = messages;
    }

    public void addMessage(Message message) {
        this.messages.add(message);
    }
}
