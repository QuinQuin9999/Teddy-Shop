package com.example.TeddyShopProject.Controller;

import com.example.TeddyShopProject.Service.CategoryServices;
import com.example.TeddyShopProject.Entity.Category;
import com.example.TeddyShopProject.Entity.Product;
import com.example.TeddyShopProject.Entity.SubCategory;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/category")
public class CategoryController {
    
    @Autowired
    private CategoryServices categoryServices;
    
    @PostMapping(value= "/save")
    private String saveOrUpdate(@RequestBody Category categories)
    {
        categoryServices.saveOrUpdate(categories);
        return categories.getId();
    }
    
    @GetMapping(value= "/getAll")
    private Iterable<Category>getCategories()
    {
        return categoryServices.listAll();
    }
    
    @PutMapping(value= "/edit/{id}")
    private Category update(@RequestBody Category category, @PathVariable(name="id") String _id)
    {
        category.setId(_id);
        categoryServices.saveOrUpdate(category);
        return category;
    }
    
    @DeleteMapping("/delete/{id}")
    private void deleteCategory(@PathVariable(name="id") String _id){
        categoryServices.deleteCategory(_id);
    }
    
    @RequestMapping("/search/{id}")
    private Category getCategories(@PathVariable(name="id") String _id){
       return categoryServices.getCategoryById(_id);
    }

    @PostMapping("/addSubCategory/{parentId}")
    public SubCategory addSubCategory(@PathVariable(name = "parentId") String parentId, @RequestBody SubCategory subCategory) {
        return categoryServices.addSubCategory(parentId, subCategory);
    }

    @DeleteMapping("/deleteSubCategory/{parentId}/{subCategoryId}")
    public void deleteSubCategory(@PathVariable(name = "parentId") String parentId, @PathVariable(name = "subCategoryId") String subCategoryId) {
        categoryServices.deleteSubCategory(parentId, subCategoryId);
    }
    
    @PutMapping("/editSubCategory/{parentId}/{subCategoryId}")
    public SubCategory editSubCategory(@PathVariable(name = "parentId") String parentId,
                                    @PathVariable(name = "subCategoryId") String subCategoryId,
                                    @RequestBody SubCategory subCategory) {
    return categoryServices.editSubCategory(parentId, subCategoryId, subCategory);

    
}
}
