package com.example.TeddyShopProject.Service;

import com.example.TeddyShopProject.Repo.CategoryRepo;
import com.example.TeddyShopProject.Entity.Category;
import com.example.TeddyShopProject.Entity.Product;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryServices {
    @Autowired
    private CategoryRepo repo;
    
    public void saveOrUpdate(Category categories){
        repo.save(categories);
    }
    
    public Iterable<Category> listAll(){
        return this.repo.findAll();
    }

    public void deleteCategory(String _id) {
        repo.deleteById(_id);
    }

    public Category getCategoryByID(String _id) {
        return repo.findById(_id).get();
    }

    public void addProductToCategory(String categoryId, Product product) {
        Category category = getCategoryByID(categoryId);
        if (category != null) {
            category.addProduct(product);
            saveOrUpdate(category);
        } else {
            throw new RuntimeException("Category not found with ID: " + categoryId);
        }
    }

    public ArrayList<String> getAllCategoryNames() {
        Iterable<Category> categories = this.repo.findAll();
        ArrayList<String> categoryNames = new ArrayList<>();
        for (Category category : categories) {
            categoryNames.add(category.getCategoryName());
        }
        return categoryNames;
    }

    public ArrayList<Product> getProductsByCategoryName(String categoryName) {
        Iterable<Category> categories = this.repo.findAll();
        for (Category category : categories) {
            if (category.getCategoryName().equalsIgnoreCase(categoryName)) {
                return new ArrayList<>(category.getList());
            }
        }
        return null;
    }

    public Category getCategoryByHref(String href) {
        Iterable<Category> categories = this.repo.findAll();
        for (Category category : categories) {
            if (category.getHref().equalsIgnoreCase(href)) {
                return category;
            }
        }
        return null;
    }
}
