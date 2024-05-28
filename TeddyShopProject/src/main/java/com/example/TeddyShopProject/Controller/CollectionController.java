package com.example.TeddyShopProject.Controller;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.TeddyShopProject.DTO.ApiResponse;
import com.example.TeddyShopProject.DTO.ErrorResponse;
import com.example.TeddyShopProject.Entity.Collection;
import com.example.TeddyShopProject.Entity.Product;
import com.example.TeddyShopProject.Service.CollectionService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/collection")

public class CollectionController {

    @Autowired
    private CollectionService collectionService;

    private static final Logger logger = LoggerFactory.getLogger(CollectionController.class);

    // @PostMapping("/create")
    // public ResponseEntity<Object> createCollection(@RequestBody Map<String,
    // Object> obj) {
    // try {
    // String id = obj.get("id").toString();
    // if (id == null) {
    // return ResponseEntity.status(HttpStatus.OK).body(new ErrorResponse("The input
    // is required", "ERR"));
    // }
    // ObjectMapper mapper = new ObjectMapper();
    // ArrayList<Product> productList = mapper.convertValue(obj.get("productList"),
    // mapper.getTypeFactory().constructCollectionType(ArrayList.class,
    // Product.class));
    // ApiResponse response = collectionService.createCollection(id, productList);

    // return ResponseEntity.status(HttpStatus.OK).body(response);
    // } catch (Exception e) {
    // logger.error("Error occurred while creating collection", e);
    // return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new
    // ErrorResponse(e.getMessage(), null));
    // }
    // }
    @PostMapping("/create")
    public ResponseEntity<Object> createCollection(@RequestBody Collection collection) {
        try {

            if (collection.getId() == null || collection.getProductList() == null) {
                return ResponseEntity.status(HttpStatus.OK).body(new ErrorResponse("The input is required", "ERR"));
            }

            ApiResponse response = collectionService.createCollection(collection);

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            logger.error("Error occurred while creating collection", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage(), null));
        }
    }

    @GetMapping("/get_all")
    public ResponseEntity<Object> getAllCollections() {
        try {
            ApiResponse response = collectionService.getAllCollections();
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            logger.error("Error occurred while getting all collections", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage(), null));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteCollection(@PathVariable("id") String collectionId) {
        try {
            if (collectionId == null) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ErrorResponse("The collectionId is required", "ERR"));
            }
            ApiResponse response = collectionService.deleteCollection(collectionId);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            logger.error("Error occurred while deleting collection", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage(), null));
        }
    }

    @PutMapping("/remove_products/{id}")
    public ResponseEntity<Object> removeProducts(@PathVariable("id") String collectionId,
            @RequestBody Collection collection) {
        try {
            if (collection.getProductList() == null) {
                return ResponseEntity.status(HttpStatus.OK).body(new ErrorResponse("The input is required", "ERR"));
            }
            ApiResponse response = collectionService.removeProducts(collectionId, collection);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            logger.error("Error occurred while remove products", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage(), null));
        }
    }

    @PutMapping("/add_products/{id}")
    public ResponseEntity<Object> addProducts(@PathVariable("id") String collectionId,
            @RequestBody ArrayList<Product> addData) {
        try {
            if (collectionId == null || addData == null) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ErrorResponse("The input is required", "ERR"));
            }
            ApiResponse response = collectionService.addProducts(collectionId, addData);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            logger.error("Error occurred while add products", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage(), null));
        }
    }

    // @PutMapping("/reid/{id}")
    // public ResponseEntity<Object> reidCollection(@PathVariable("id") String
    // collectionId,
    // @RequestBody Map<String, Object> obj) {
    // try {
    // if (obj.get("newId") == null || collectionId == null) {
    // return ResponseEntity.status(HttpStatus.OK)
    // .body(new ErrorResponse("The input is required", "ERR"));
    // }
    // String id = obj.get("newId").toString();
    // ApiResponse response = collectionService.reidCollection(collectionId, id);
    // return ResponseEntity.status(HttpStatus.OK).body(response);
    // } catch (Exception e) {
    // logger.error("Error occurred while remame collection", e);
    // return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new
    // ErrorResponse(e.getMessage(), null));
    // }
    // }

    @GetMapping("/get_by_id/{id}")
    public ResponseEntity<Object> getCollectionById(@PathVariable("id") String id) {
        try {
            if (id == null) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ErrorResponse("The input is required", "ERR"));
            }
            ApiResponse response = collectionService.getCollectionById(id);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            logger.error("Error occurred while find collection", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage(), null));
        }
    }
}