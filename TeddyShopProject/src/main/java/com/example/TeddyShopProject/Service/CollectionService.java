package com.example.TeddyShopProject.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import com.example.TeddyShopProject.DTO.ApiResponse;
import com.example.TeddyShopProject.Entity.Collection;
import com.example.TeddyShopProject.Entity.Product;
import com.example.TeddyShopProject.Repository.CollectionRepository;

@Service
public class CollectionService {

    @Autowired
    private CollectionRepository collectionRepository;

    // public ApiResponse createCollection(String id, ArrayList<Product>
    // productList) {
    // Collection createdCollection = collectionRepository.save(new Collection(id,
    // productList));
    // if (createdCollection == null) {
    // return new ApiResponse("ERR", "Failed");
    // }
    // return new ApiResponse("OK", "Collection created successfully",
    // createdCollection);
    // }
    public ApiResponse createCollection(Collection newCollection) {
        Collection checkCollection = collectionRepository.findById(newCollection.getId()).orElse(null);
        if (checkCollection != null) {
            return new ApiResponse("ERR", " collection id is already defined");
        }
        Collection createdCollection = collectionRepository.save(newCollection);
        if (createdCollection == null) {
            return new ApiResponse("ERR", "Failed");
        }
        return new ApiResponse("OK", "Collection created successfully", createdCollection);
    }

    public ApiResponse getAllCollections() {
        List<Collection> collections = collectionRepository.findAll();
        if (collections == null) {
            return new ApiResponse("ERR", "Failed");
        }
        return new ApiResponse("OK", "All Collections found successfully", collections);
    }

    public ApiResponse deleteCollection(String id) {
        if (!collectionRepository.existsById(id)) {
            return new ApiResponse("ERR", "The collection is not defined");
        }
        collectionRepository.deleteById(id);
        return new ApiResponse("OK", "Delete collection successfully");
    }

    public ApiResponse removeProducts(String id, Collection updateData) {
        Collection collection = collectionRepository.findById(id).orElse(null);
        if (collection == null) {
            return new ApiResponse("ERR", "The collection is not defined");
        }
        // collection.setId(updateData.getId());
        collection.setProductList(updateData.getProductList());
        return new ApiResponse("OK", "Collection is updated successfully", collectionRepository.save(collection));
    }

    public ApiResponse addProducts(String id, ArrayList<Product> addData) {
        Collection collection = collectionRepository.findById(id).orElse(null);
        if (collection == null) {
            return new ApiResponse("ERR", "The collection is not defined");
        }
        if (collection.getProductList() == null) {
            collection.setProductList(new ArrayList<>());
        }
        collection.getProductList().addAll(addData);
        Collection updatedCollection = collectionRepository.save(collection);
        if (updatedCollection == null) {
            return new ApiResponse("ERR", "Failed");
        }
        return new ApiResponse("OK", "Collection is updated successfully", updatedCollection);
    }

    // public ApiResponse reidCollection(String collectionId, String newId) {
    // Collection checkCollection =
    // collectionRepository.findById(collectionId).orElse(null);
    // if (checkCollection == null) {
    // return new ApiResponse("ERR", "The collection is not defined");
    // }
    // checkCollection = collectionRepository.findById(newId).orElse(null);
    // if (checkCollection != null) {
    // return new ApiResponse("ERR", " The new id is already defined");
    // }
    // // checkCollection.setId(newId);
    // Collection updatedCollection = collectionRepository.save(checkCollection);
    // if (updatedCollection == null) {
    // return new ApiResponse("ERR", "Failed");
    // }
    // return new ApiResponse("OK", "Collection is reidd successfully",
    // updatedCollection);
    // }

    public ApiResponse getCollectionById(String id) {
        Collection collection = collectionRepository.findById(id).orElse(null);
        if (collection == null) {
            return new ApiResponse("ERR", "The collection is not defined");
        }
        return new ApiResponse("OK", "Collection found successfully", collection);
    }
}
