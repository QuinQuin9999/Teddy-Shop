package com.example.TeddyShopProject.Entity;

public class SubCategory {

    private String _id;
    private String subCategoryName;
    private String href;

    public SubCategory() {}

    public SubCategory(String _id, String subCategoryName, String href) {
        this._id = _id;
        this.subCategoryName = subCategoryName;
        this.href = href;
    }

    public String getId() {
        return _id;
    }

    public String getSubCategoryName() {
        return subCategoryName;
    }

    public String getHref() {
        return href;
    }

    public void setId(String _id) {
        this._id = _id;
    }

    public void setSubCategoryName(String subCategoryName) {
        this.subCategoryName = subCategoryName;
    }

    public void setHref(String href) {
        this.href = href;
    }
}
