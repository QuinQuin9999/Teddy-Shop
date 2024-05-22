package com.example.TeddyShopProject.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.example.TeddyShopProject.DTO.ApiResponse;
import com.example.TeddyShopProject.Model.Cart;
import com.example.TeddyShopProject.Repository.CartRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public ApiResponse getItems() {
        List<Cart> items = cartRepository.findAll();
        if (items != null) {
            return new ApiResponse("OK", "Success", items);
        } else {
            return new ApiResponse("ERR", "Failed");
        }
    }

    public ApiResponse addItems(String productID, int quantity) {
        Cart item = cartRepository.save(new Cart(productID, quantity));
        if (item != null) {
            return new ApiResponse("OK", "Success", item);
        } else {
            return new ApiResponse("ERR", "Failed");
        }
    }

    public ApiResponse updateItems(String productID, int quantity) {
        Cart item = cartRepository.findByProductID(productID).orElse(null);
        if (item == null) {
            return new ApiResponse("ERR", "The cart item is not defined");
        }
        item.setQuantity(quantity);
        Cart updatedItem = cartRepository.save(item);
        return new ApiResponse("OK", "SUCCESS", updatedItem);
    }

    public ApiResponse deleteItems(String id) {
        cartRepository.deleteByProductID(id);
        return new ApiResponse("OK", "SUCCESS");
    }
}
