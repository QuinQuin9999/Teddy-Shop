package com.example.TeddyShopProject.Service;

import com.example.TeddyShopProject.Entity.Carousel;
import com.example.TeddyShopProject.Repository.CarouselRepo;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class CarouselService {

    @Autowired
    private CarouselRepo carouselRepository;

    private final String cloudinaryUrl = "https://api.cloudinary.com/v1_1/dsbigrnvs/image/upload";

    public List<Carousel> listAll() {
        return carouselRepository.findAll();
    }

    public Carousel getCarouselById(String id) {
        Optional<Carousel> optionalCarousel = carouselRepository.findById(id);
        return optionalCarousel.orElse(null);
    }

    public Carousel saveOrUpdate(MultipartFile file, String fileName) throws IOException {
        String uploadUrl = uploadToCloudinary(file);
    
        JSONObject jsonResponse = new JSONObject(uploadUrl);
        String url = jsonResponse.getString("secure_url");
        String publicId = jsonResponse.getString("public_id");
        String format = jsonResponse.getString("format");
        int width = jsonResponse.getInt("width");
        int height = jsonResponse.getInt("height");
        long bytes = jsonResponse.getLong("bytes");
    
        double kilobytes = bytes / 1024.0;
        String sizeInKb = String.format("%.2f KB", kilobytes);  
    
        Carousel carousel = new Carousel();
        carousel.setFileName(fileName);
        carousel.setUrl(url);
        carousel.setData(sizeInKb);
        carousel.setType(format);
        carousel.setSize(width + "x" + height);
    
        return carouselRepository.save(carousel);
    }
    
    private String uploadToCloudinary(MultipartFile file) throws IOException {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpPost uploadFile = new HttpPost(cloudinaryUrl);
    
        MultipartEntityBuilder builder = MultipartEntityBuilder.create();
        builder.addTextBody("timestamp", String.valueOf(System.currentTimeMillis() / 1000));
        builder.addTextBody("upload_preset", "ml_default"); 
        builder.addBinaryBody("file", file.getInputStream(), ContentType.MULTIPART_FORM_DATA, file.getOriginalFilename());
    
        HttpEntity multipart = builder.build();
        uploadFile.setEntity(multipart);
    
        HttpResponse response = httpClient.execute(uploadFile);
        HttpEntity responseEntity = response.getEntity();
        return EntityUtils.toString(responseEntity);
    }

    public boolean deleteCarousel(String id) {
        Optional<Carousel> optionalCarousel = carouselRepository.findById(id);
        if (optionalCarousel.isPresent()) {
            carouselRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public Carousel editCarousel(String id, String fileName) {
        Optional<Carousel> optionalCarousel = carouselRepository.findById(id);
        if (!optionalCarousel.isPresent()) {
            throw new RuntimeException("Carousel not found with ID: " + id);
        }

        Carousel carousel = optionalCarousel.get();
        if (fileName != null && !fileName.isEmpty()) {
            carousel.setFileName(fileName);
        }

        return carouselRepository.save(carousel);
    }
}
