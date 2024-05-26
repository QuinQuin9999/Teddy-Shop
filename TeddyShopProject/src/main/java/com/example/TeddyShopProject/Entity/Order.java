package com.example.TeddyShopProject.Entity;

import java.util.ArrayList;
import java.util.Map;
import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

@Document(collection = "orders")
public class Order {

    @Id
    private String id;
    private ArrayList<Map<String, Object>> orderItems;
    private Map<String, String> shippingAddress;
    private String paymentMethod;
    private String shipmentMethod;
    private double itemsPrice;
    private double shippingPrice;
    private double totalPrice;

    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId userInfo;
    private boolean isPaid;
    private Date paidAt;
    // private boolean isDelivered;
    private String status;

    public Order() {
    }

    public Order(ArrayList<Map<String, Object>> orderItems, Map<String, String> shippingAddress, String paymentMethod,
            String shipmentMethod, double itemsPrice, double shippingPrice, double totalPrice, ObjectId userInfo,
            boolean isPaid) {
        this.orderItems = orderItems;
        this.shippingAddress = shippingAddress;
        this.paymentMethod = paymentMethod;
        this.shipmentMethod = shipmentMethod;
        this.itemsPrice = itemsPrice;
        this.shippingPrice = shippingPrice;
        this.totalPrice = totalPrice;
        this.userInfo = userInfo;
        this.isPaid = isPaid;
        // this.isDelivered = isDelivered;
        this.status = "Pending";
    }

    // public Order(ArrayList<Map<String, Object>> orderItems, Map<String, String>
    // shippingAddress, String paymentMethod,
    // String shipmentMethod, double itemsPrice, double shippingPrice, double
    // totalPrice,
    // boolean isPaid) {
    // this.orderItems = orderItems;
    // this.shippingAddress = shippingAddress;
    // this.paymentMethod = paymentMethod;
    // this.shipmentMethod = shipmentMethod;
    // this.itemsPrice = itemsPrice;
    // this.shippingPrice = shippingPrice;
    // this.totalPrice = totalPrice;
    // this.userInfo = null;
    // this.isPaid = isPaid;
    // // this.isDelivered = isDelivered;
    // this.status = "Pending";
    // }

    public String getId() {
        return id;
    }

    public ArrayList<Map<String, Object>> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(ArrayList<Map<String, Object>> orderItems) {
        this.orderItems = orderItems;
    }

    public Map<String, String> getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(Map<String, String> shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getShipmentMethod() {
        return shipmentMethod;
    }

    public void setShipmentMethod(String shipmentMethod) {
        this.shipmentMethod = shipmentMethod;
    }

    public double getItemsPrice() {
        return itemsPrice;
    }

    public void setItemsPrice(double itemsPrice) {
        this.itemsPrice = itemsPrice;
    }

    public double getShippingPrice() {
        return shippingPrice;
    }

    public void setShippingPrice(double shippingPrice) {
        this.shippingPrice = shippingPrice;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public ObjectId getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(ObjectId userInfo) {
        this.userInfo = userInfo;
    }

    public boolean isPaid() {
        return isPaid;
    }

    public void setPaid(boolean isPaid) {
        this.isPaid = isPaid;
    }

    public Date getPaidAt() {
        return paidAt;
    }

    public void setPaidAt(Date paidAt) {
        this.paidAt = paidAt;
    }

    // public boolean isDelivered() {
    // return isDelivered;
    // }

    // public void setDelivered(boolean isDelivered) {
    // this.isDelivered = isDelivered;
    // }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
