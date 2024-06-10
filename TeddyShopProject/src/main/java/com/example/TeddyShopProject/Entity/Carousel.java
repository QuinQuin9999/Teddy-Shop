package com.example.TeddyShopProject.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "carousels")
public class Carousel {

    @Id
    private String _id;
    private String fileName;
    private String data;
    private String type;
    private String size;
    private String url;

    public Carousel()
    {
        
    }

    public Carousel(String _id, String fileName, String data, String type, String size, String url) {
        this._id = _id;
        this.fileName = fileName;
        this.data = data;
        this.type = type;
        this.size = size;
        this.url = url;
    }

    public String getId() {
        return _id;
    }

    public String getFileName() {
        return fileName;
    }

    public String getData() {
        return data;
    }

    public String getType() {
        return type;
    }

    public String getSize() {
        return size;
    }

    public String getUrl() {
        return url;
    }

    public void setId(String _id) {
        this._id = _id;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setData(String data) {
        this.data = data;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
