package com.example.TeddyShopProject.Service;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.example.TeddyShopProject.DTO.ApiResponse;
import com.example.TeddyShopProject.Entity.Order;
import com.example.TeddyShopProject.Repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public ApiResponse createOrder(Order newOrder) {
        Order createdOrder = orderRepository.save(newOrder);
        if (createdOrder != null) {
            return new ApiResponse("OK", "Success", createdOrder);
        } else {
            return new ApiResponse("ERR", "Failed");
        }
    }

    public ApiResponse getOrderDetails(String orderId) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order == null) {
            return new ApiResponse("ERR", "The order is not defined");
        }
        return new ApiResponse("OK", "SUCCESS", order);
    }

    public ApiResponse getAllOrder() {
        List<Order> orders = orderRepository.findAll();
        return new ApiResponse("OK", "SUCCESS", orders);
    }

    public ApiResponse getAllUserOrder(String userInfo) {
        ObjectId userId = new ObjectId(userInfo);
        List<Order> orders = orderRepository.findByUserInfo(userId);
        if (orders.isEmpty()) {
            return new ApiResponse("ERR", "The order is not defined");
        }
        return new ApiResponse("OK", "SUCCESS", orders);
    }

    public ApiResponse updateOrder(String orderId, Order updateData) {
        Order updatedOrder = orderRepository.save(updateData);
        if (updatedOrder == null) {
            return new ApiResponse("ERR", "The order is not defined");
        }
        return new ApiResponse("OK", "Order updated successfully", updatedOrder);
    }

    public ApiResponse deleteOrder(String orderId) {
        Order checkOrder = orderRepository.findById(orderId).orElse(null);
        if (checkOrder == null) {
            return new ApiResponse("ERR", "The order is not defined");
        }
        orderRepository.deleteById(orderId);
        return new ApiResponse("OK", "Order deleted successfully");
    }

}
