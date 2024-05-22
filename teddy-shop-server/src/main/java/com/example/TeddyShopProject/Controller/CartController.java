package com.example.TeddyShopProject.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.TeddyShopProject.DTO.ApiResponse;
import com.example.TeddyShopProject.DTO.ErrorResponse;
import com.example.TeddyShopProject.Service.CartService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/cart")

public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping("")
    public ResponseEntity<Object> getItems() {
        try {
            ApiResponse res = cartService.getItems();
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(e.getMessage(), null));
        }
    }

    @PostMapping("/{id}")
    public ResponseEntity<Object> addItems(@PathVariable("id") String id, @RequestParam int sl) {
        try {
            if (id == null) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ErrorResponse("The userId is required", "ERR"));
            }
            ApiResponse res = cartService.addItems(id, sl);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(e.getMessage(), null));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateItems(@PathVariable("id") String id, @RequestParam int sl) {
        try {
            if (id == null) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ErrorResponse("The userId is required", "ERR"));
            }
            ApiResponse res = cartService.updateItems(id, sl);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(e.getMessage(), null));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteItems(@PathVariable("id") String id) {
        try {
            if (id == null) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ErrorResponse("The userId is required", "ERR"));
            }

            ApiResponse res = cartService.deleteItems(id);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(e.getMessage(), null));
        }
    }
}
