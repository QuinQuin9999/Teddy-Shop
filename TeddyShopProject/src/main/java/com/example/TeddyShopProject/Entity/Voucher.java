package com.example.TeddyShopProject.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "vouchers")
public class Voucher {
    @Id
    private String _id;
    private String code;
    private String name;
    private int percent;
    private Double minPriceOrder;
    private Double maxPrice;
    private int type; //1: product, 2: ship
    private int quantity;
    private String description;
    private Date fromDate; 
    private Date toDate;  

    public Voucher(String _id, String code, String name, int percent, Double maxPrice, int type, int quantity, 
                   String description, Date fromDate, Date toDate) {
        this._id = _id;
        this.code = code;
        this.name = name;
        this.percent = percent;
        this.maxPrice = maxPrice;
        this.type = type;
        this.quantity = quantity;
        this.description = description;
        this.fromDate = fromDate;
        this.toDate = toDate;
    }

    public Voucher() {
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPercent() {
        return percent;
    }

    public void setPercent(int percent) {
        this.percent = percent;
    }

    public Double getMinPriceOrder() {
        return minPriceOrder;
    }

    public void setMinPriceOrder(Double minPriceOrder) {
        this.minPriceOrder = minPriceOrder;
    }

    public Double getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(Double maxPrice) {
        this.maxPrice = maxPrice;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getFromDate() {
        return fromDate;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    public Date getToDate() {
        return toDate;
    }

    public void setToDate(Date toDate) {
        this.toDate = toDate;
    }
}
