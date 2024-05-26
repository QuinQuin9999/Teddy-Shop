package com.example.TeddyShopProject.Service;

import com.example.TeddyShopProject.Entity.Category;
import com.example.TeddyShopProject.Entity.Product;
import com.example.TeddyShopProject.Entity.SubCategory;
import com.example.TeddyShopProject.Repository.CategoryRepo;
import com.example.TeddyShopProject.Repository.SubCategoryRepo;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CategoryServices {
    @Autowired
    private CategoryRepo repo;

    @Autowired
    private SubCategoryRepo subRepo;

    public void saveOrUpdate(Category categories) {
        repo.save(categories);
    }

    public Iterable<Category> listAll() {
        return this.repo.findAll();
    }

    public Category getCategoryById(String id) {
        return repo.findById(id).orElse(null);
    }

    public void deleteCategory(String id) {
        repo.deleteById(id);
    }

    public SubCategory addSubCategory(String parentId, SubCategory subCategory) {
        Category parentCategory = getCategoryById(parentId);
        if (parentCategory != null) {
            subRepo.save(subCategory);
            parentCategory.addSubCategory(subCategory);
            saveOrUpdate(parentCategory);
            return subCategory;
        }
        return null;
    }

    public void deleteSubCategory(String parentId, String subCategoryId) {
        Category parentCategory = getCategoryById(parentId);
        if (parentCategory != null) {
            parentCategory.getSubCategories().removeIf(sub -> sub.getId().equals(subCategoryId));
            saveOrUpdate(parentCategory);
        }
    }

    public SubCategory editSubCategory(String parentId, String subCategoryId, SubCategory updatedSubCategory) {
        Category parentCategory = repo.findById(parentId).orElseThrow(() ->  new IllegalArgumentException("Error"));
    
        ArrayList<SubCategory> subCategories = parentCategory.getSubCategories();
    
        for (int i = 0; i < subCategories.size(); i++) {
            SubCategory subCategory = subCategories.get(i);
            if (subCategory.getId().equals(subCategoryId)) {
                subCategory.setSubCategoryName(updatedSubCategory.getSubCategoryName());
                subCategory.setHref(updatedSubCategory.getHref());
                repo.save(parentCategory);
                return subCategory;
            }
        }
    
        throw new IllegalArgumentException("Error");
    }
}