package com.example.TeddyShopProject.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.TeddyShopProject.DTO.ApiResponse;
import com.example.TeddyShopProject.DTO.ErrorResponse;
import com.example.TeddyShopProject.Entity.Order;
import com.example.TeddyShopProject.Service.OrderService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/order")

public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/createOrder/{id}")
    public ResponseEntity<Object> createOrder(@PathVariable("id") String id, @RequestBody Map<String, Object> obj) {
        try {
            ArrayList<Map<String, Object>> orderItems = (ArrayList<Map<String, Object>>) obj.get("orderItems");
            String fullName = obj.get("fullName").toString();
            String address = obj.get("address").toString();
            String phone = obj.get("phone").toString();
            String paymentMethod = obj.get("paymentMethod").toString();
            double itemsPrice = ((Number) obj.get("itemsPrice")).doubleValue();
            double shippingPrice = ((Number) obj.get("shippingPrice")).doubleValue();
            double totalPrice = ((Number) obj.get("totalPrice")).doubleValue();
            String shipmentMethod = obj.get("shipmentMethod").toString();
            // if (id == "") {
            // id = "000000000000000000000000";
            // }
            ObjectId userInfo = new ObjectId(id);
            boolean isPaid = (boolean) obj.get("isPaid");
            // boolean isDelivered = (boolean) obj.get("isDelivered");

            Map<String, String> shippingAddress = new HashMap<>();
            shippingAddress.put("fullName", fullName);
            shippingAddress.put("address", address);
            shippingAddress.put("phone", phone);

            Order order = new Order(orderItems, shippingAddress, paymentMethod, shipmentMethod, itemsPrice,
                    shippingPrice, totalPrice, userInfo, isPaid);
            ApiResponse response = orderService.createOrder(order);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(e.getMessage(), null));
        }
    }

    @GetMapping("/get-details-order/{id}")
    public ResponseEntity<Object> getOrderDetails(@PathVariable("id") String orderId) {
        try {
            if (orderId == null) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ErrorResponse("The orderId is required", "ERR"));
            }
            ApiResponse response = orderService.getOrderDetails(orderId);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(e.getMessage(), null));
        }
    }

    @GetMapping("/get-all-order")
    public ResponseEntity<Object> getAllOrder() {
        try {
            ApiResponse response = orderService.getAllOrder();
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(e.getMessage(), null));
        }
    }

    @GetMapping("/get-all-userOrder/{userInfo}")
    public ResponseEntity<Object> getAllUserOrder(@PathVariable("userInfo") String userInfo) {
        try {
            if (userInfo == null) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ErrorResponse("The userInfo is required", "ERR"));
            }
            ApiResponse response = orderService.getAllUserOrder(userInfo);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(e.getMessage(), null));
        }
    }

    @PutMapping("/update-order/{id}")
    public ResponseEntity<Object> updateOrder(@PathVariable("id") String orderId,
            @RequestBody Order updateData) {
        try {
            if (orderId == null) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ErrorResponse("The orderId is required", "ERR"));
            }
            ApiResponse response = orderService.updateOrder(orderId, updateData);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(e.getMessage(), null));
        }
    }

    @DeleteMapping("/delete-order/{id}")
    public ResponseEntity<Object> deleteOrder(@PathVariable("id") String orderId) {
        try {
            if (orderId == null) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ErrorResponse("The orderId is required", "ERR"));
            }
            ApiResponse response = orderService.deleteOrder(orderId);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(e.getMessage(), null));
        }
    }
}
