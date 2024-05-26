package com.example.TeddyShopProject.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.example.TeddyShopProject.Util.ShippingAddress;
import java.util.Date;
import java.util.ArrayList;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String username;
    private String email;
    private String phone;
    private String address;
    private ArrayList<ShippingAddress> shippingAddress;
    private String password;
    private String avatar;
    private String accessToken;
    private String refreshToken;
    private Date createTokenAt;

    // Constructor
    public User() {

    }

    public User(String username, String email, String phone, String address, String password) {
        // this.id = id;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.password = password;
        this.shippingAddress = new ArrayList<ShippingAddress>();
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public ArrayList<ShippingAddress> getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(ArrayList<ShippingAddress> shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public Date getCreateTokenAt() {
        return createTokenAt;
    }

    public void setCreateTokenAt(Date createTokenAt) {
        this.createTokenAt = createTokenAt;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ",username=" + username + ", email=" + email + ", phone=" + phone + ", address="
                + address + ", shippingAddress=" + shippingAddress + ", password=" + password + ", avatar=" + avatar
                + ", accessToken=" + accessToken + ", refreshToken=" + refreshToken + ", createTokenAt="
                + createTokenAt + "]";
    }

}
