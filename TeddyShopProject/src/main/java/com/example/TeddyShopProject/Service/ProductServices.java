package com.example.TeddyShopProject.Service;

import com.example.TeddyShopProject.Repo.ProductRepo;
import com.example.TeddyShopProject.Entity.Product;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServices {
    @Autowired
    private ProductRepo repo;
    
    public void saveOrUpdate(Product products){
        repo.save(products);
    }
    
    public Iterable<Product> listAll(){
        return this.repo.findAll();
    }

    public void deleteProduct(String _id) {
        repo.deleteById(_id);
    }

    public Product getProductByID(String _id) {
        return repo.findById(_id).get();
    }

    public ArrayList<Product> getProductsByType(String productType) {
        ArrayList<Product> productList = new ArrayList<>();
        
        Iterable<Product> allProducts = repo.findAll();
        
        for (Product product : allProducts) {
            if (product.getProductType().equalsIgnoreCase(productType)) {
                productList.add(product);
            }
        }
        
        return productList;
    }

    public ArrayList<Product> getProductsByName(String name) {
        ArrayList<Product> productList = new ArrayList<>();

        Iterable<Product> allProducts = repo.findAll();

        for (Product product : allProducts) {
            if (product.getProductName().toLowerCase().contains(name.toLowerCase())) {
                productList.add(product);
            }
        }
        return productList;
    }

    public ArrayList<Product> getProductsByPriceRange(double minPrice, double maxPrice) {
        ArrayList<Product> productsInRange = new ArrayList<>();
        Iterable<Product> allProducts = repo.findAll();
        for (Product product : allProducts) {
            for (double price : product.getProductPrice().values()) {
                if (price >= minPrice && price <= maxPrice) {
                    productsInRange.add(product);
                    break; // Nếu sản phẩm có một giá nằm trong khoảng, thêm nó và thoát khỏi vòng lặp giá
                }
            }
        }
        return productsInRange;
    }
    
    public ArrayList<Product> getProductsBySize(String size) {
        ArrayList<Product> productsBySize = new ArrayList<>();
        Iterable<Product> allProducts = repo.findAll();
        
        for (Product product : allProducts) {
            ArrayList<String> sizes = product.getDescription().get("Size");
            if (sizes != null && sizes.contains(size)) {
                productsBySize.add(product);
            }
        }
        
        return productsBySize;
    }
    
    public ArrayList<String> getAllSizes() {
        ArrayList<String> allSizes = new ArrayList<>();
        Iterable<Product> allProducts = repo.findAll();
        for (Product product : allProducts) {
            ArrayList<String> sizes = product.getDescription().get("Size");
            if(sizes != null)
            {
                for(String size: sizes)
                {
                    if(!allSizes.contains(size))
                    {
                        allSizes.add(size);
                    }
                }
            }   
        }
        return allSizes;
    }
    
    public ArrayList<String> getAllColors() {
        ArrayList<String> allColors = new ArrayList<>();
        Iterable<Product> allProducts = repo.findAll();
        for (Product product : allProducts) {
            ArrayList<String> colors = product.getDescription().get("Color");
            if(colors != null)
            {
                for(String color: colors)
                {
                    if(!allColors.contains(color))
                    {
                    allColors.add(color);
                    }
                }
            }   
        }
        return allColors;
    }
    
    public ArrayList<String> getAllMaterials() {
        ArrayList<String> allMaterials = new ArrayList<>();
        Iterable<Product> allProducts = repo.findAll();
        for (Product product : allProducts) {
            ArrayList<String> materials = product.getDescription().get("Material");
            if(materials != null)
            {
                for(String material: materials)
                {
                    if(!allMaterials.contains(material))
                    {
                    allMaterials.add(material);
                    }
                }
            }   
        }
        return allMaterials;
    }
    
    public ArrayList<Product> searchProducts(String productName, Double minPrice, Double maxPrice, String size, String color, String material) {
    ArrayList<Product> productsInRange = new ArrayList<>();
    Iterable<Product> allProducts = repo.findAll();

    for (Product product : allProducts) {
        boolean matchesName = (productName == null || product.getProductName().toLowerCase().contains(productName.toLowerCase()));
        boolean matchesPrice = (minPrice == null && maxPrice == null);
        for (double price : product.getProductPrice().values()) {
            double discountedPrice = (product.getDiscount() > 0) ? price * (1 - product.getDiscount()/100.0) : price;
            if ((minPrice == null || discountedPrice >= minPrice) && (maxPrice == null || discountedPrice <= maxPrice)) {
                matchesPrice = true;
                break;
            }
        }
        boolean matchesSize = (size == null || (product.getDescription().containsKey("Size") && product.getDescription().get("Size") != null && product.getDescription().get("Size").contains(size)));
        boolean matchesColor = (color == null || (product.getDescription().containsKey("Color") && product.getDescription().get("Color") != null && product.getDescription().get("Color").contains(color)));
        boolean matchesMaterial = (material == null || (product.getDescription().containsKey("Material") && product.getDescription().get("Material") != null && product.getDescription().get("Material").contains(material)));
        if (matchesName && matchesPrice && matchesSize && matchesColor && matchesMaterial) {
            productsInRange.add(product);
        }
    }
    return productsInRange;
    }

    
}
