package com.example.Project.Controller;

import com.example.Project.Service.CategoryServices;
import com.example.Project.Entity.Category;
import com.example.Project.Entity.Product;
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
    private String saveCategory(@RequestBody Category categories)
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
       return categoryServices.getCategoryByID(_id);
    }
    
    @RequestMapping("/searchByHref/{href}")
    private Category getCategoriesByHref(@PathVariable(name="href") String href){
       return categoryServices.getCategoryByHref(href);
    }
     
    @PostMapping("/addProduct/{categoryId}")
    private void addProductToCategory(@PathVariable(name = "categoryId") String categoryId, @RequestBody Product product) {
        categoryServices.addProductToCategory(categoryId, product);
    }
    
    @GetMapping(value = "/getAllNames")
    private ArrayList<String> getAllCategoryNames() {
        return categoryServices.getAllCategoryNames();
    }
    
    @GetMapping(value = "/getProducts/{categoryName}")
    private ArrayList<Product> getProductsByCategoryName(@PathVariable(name = "categoryName") String categoryName) {
        return categoryServices.getProductsByCategoryName(categoryName);
    }
}
