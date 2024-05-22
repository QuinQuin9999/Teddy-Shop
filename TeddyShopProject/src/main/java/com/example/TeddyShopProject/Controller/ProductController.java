package com.example.Project.Controller;

import com.example.Project.Service.ProductServices;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/product")
public class ProductController {
    
    @Autowired
    private ProductServices productServices;
    
    @PostMapping(value= "/save")
    private String saveProduct(@RequestBody Product products)
    {
        productServices.saveOrUpdate(products);
        return products.getId();
    }
    
    @GetMapping(value= "/getAll")
    private Iterable<Product>getProducts()
    {
        return productServices.listAll();
    }
    
    @PutMapping(value= "/edit/{id}")
    private Product update(@RequestBody Product product, @PathVariable(name="id") String _id)
    {
        product.setId(_id);
        productServices.saveOrUpdate(product);
        return product;
    }
    
    @DeleteMapping("/delete/{id}")
    private void deleteProduct(@PathVariable(name="id") String _id){
        productServices.deleteProduct(_id);
    }
    
    @RequestMapping("/search/{id}")
    private Product getProducts(@PathVariable(name="id") String _id){
       return productServices.getProductByID(_id);
    }
    
    @GetMapping("/searchByType")
    private ArrayList<Product> getProductsByType(@RequestParam String productType) {
        return productServices.getProductsByType(productType);
    }
    
    @GetMapping("/searchByName")
    private ArrayList<Product> getProductsByName(@RequestParam String productName) {
        return productServices.getProductsByName(productName);
    }
    
    @GetMapping("/searchByPriceRange")
    public ArrayList<Product> getProductsByPriceRange(@RequestParam double minPrice, @RequestParam double maxPrice) {
        return productServices.getProductsByPriceRange(minPrice, maxPrice);
    }
    
    @GetMapping("/searchBySize")
    public ArrayList<Product> getProductsBySize(@RequestParam String size) {
        return productServices.getProductsBySize(size);
    }
    
    @GetMapping("/getAllSizes")
    private ArrayList<String> getAllSizes() {
        return productServices.getAllSizes();
    }
    
    @GetMapping("/getAllColors")
    private ArrayList<String> getAllColors() {
        return productServices.getAllColors();
    }
    
    @GetMapping("/getAllMaterials")
    private ArrayList<String> getAllMaterials() {
        return productServices.getAllMaterials();
    }
    
    @GetMapping("/search")
    public ArrayList<Product> searchProducts(
        @RequestParam(required = false) String productName,
        @RequestParam(required = false) Double minPrice,
        @RequestParam(required = false) Double maxPrice,
        @RequestParam(required = false) String size,
        @RequestParam(required = false) String color,
        @RequestParam(required = false) String material) {
        return productServices.searchProducts(productName, minPrice, maxPrice, size, color, material);
    }
}