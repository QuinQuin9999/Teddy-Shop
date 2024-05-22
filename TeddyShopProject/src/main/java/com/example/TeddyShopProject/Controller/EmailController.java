package com.example.TeddyShopProject.Controller;

// import java.util.regex.Pattern;
// import java.util.regex.Matcher;
// import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.example.TeddyShopProject.DTO.ApiResponse;
import com.example.TeddyShopProject.DTO.ErrorResponse;
import com.example.TeddyShopProject.Entity.User;
import com.example.TeddyShopProject.Service.EmailService;
import com.example.TeddyShopProject.Service.UserService;
import com.example.TeddyShopProject.Util.PasswordGenerator;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/sendEmail")

public class EmailController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserService userService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("")
    public ResponseEntity<Object> sendEmail(@RequestBody Map<String, Object> obj) {
        try {
            String email = obj.get("email").toString();
            User user = userService.findByEmail(email);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ErrorResponse("The user is not defined", "ERR"));
            }
            String newPassword = PasswordGenerator.generateRandomPassword();
            // logger.info("New password: " + newPassword);
            String hashedPassword = passwordEncoder.encode(newPassword);
            ApiResponse sendEmailRes = emailService.sendEmail(email, newPassword);
            user.setPassword(hashedPassword);
            ApiResponse updateRes = userService.updateUser(user.getId(), user);
            return ResponseEntity.status(HttpStatus.OK).body(sendEmailRes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage(), null));
        }
    }
}
