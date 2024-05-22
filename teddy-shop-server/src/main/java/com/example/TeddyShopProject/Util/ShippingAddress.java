package com.example.TeddyShopProject.Util;

public class ShippingAddress {
    private String addressName;
    private String addressPhone;
    private String addressProvince;
    private String addressDistrict;
    private String addressWard;
    private String addressNumber;

    // Constructor
    public ShippingAddress(String addressName, String addressPhone, String addressProvince, String addressDistrict,
            String addressWard, String addressNumber) {
        this.addressName = addressName;
        this.addressPhone = addressPhone;
        this.addressProvince = addressProvince;
        this.addressDistrict = addressDistrict;
        this.addressWard = addressWard;
        this.addressNumber = addressNumber;
    }

    // Getters
    public String getAddressName() {
        return addressName;
    }

    public String getAddressPhone() {
        return addressPhone;
    }

    public String getAddressProvince() {
        return addressProvince;
    }

    public String getAddressDistrict() {
        return addressDistrict;
    }

    public String getAddressWard() {
        return addressWard;
    }

    public String getAddressNumber() {
        return addressNumber;
    }

    // Setters
    public void setAddressName(String addressName) {
        this.addressName = addressName;
    }

    public void setAddressPhone(String addressPhone) {
        this.addressPhone = addressPhone;
    }

    public void setAddressProvince(String addressProvince) {
        this.addressProvince = addressProvince;
    }

    public void setAddressDistrict(String addressDistrict) {
        this.addressDistrict = addressDistrict;
    }

    public void setAddressWard(String addressWard) {
        this.addressWard = addressWard;
    }

    public void setAddressNumber(String addressNumber) {
        this.addressNumber = addressNumber;
    }
}
