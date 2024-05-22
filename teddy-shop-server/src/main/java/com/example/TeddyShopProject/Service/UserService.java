package com.example.TeddyShopProject.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.TeddyShopProject.DTO.ApiResponse;
import com.example.TeddyShopProject.Model.User;
import com.example.TeddyShopProject.Repository.UserRepository;
import com.example.TeddyShopProject.Util.ShippingAddress;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ApiResponse createUser(User newUser) {
        String hashPass = passwordEncoder.encode(newUser.getPassword());
        newUser.setPassword(hashPass);
        User savedUser = userRepository.save(newUser);

        if (savedUser != null) {
            return new ApiResponse("OK", "SUCCESS", savedUser);
        }
        return new ApiResponse("ERR", "User creation failed");
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public ApiResponse loginUser(String email, String password) {
        User checkUser = userRepository.findByEmail(email);
        if (checkUser == null) {
            checkUser = userRepository.findByUsername(email);
        }
        if (checkUser == null || !passwordEncoder.matches(password, checkUser.getPassword())) {
            return new ApiResponse("ERR", "The password or user is incorrect");
        }
        Date issuedAt = new Date();
        Map<String, Object> payload = new HashMap<>();
        payload.put("id", checkUser.getId());
        payload.put("issuedAt", issuedAt.getTime());
        String access_token = jwtService.generateAccessToken(payload);
        String refresh_token = jwtService.generateRefreshToken(payload);

        checkUser.setAccessToken(access_token);
        checkUser.setRefreshToken(refresh_token);
        checkUser.setCreateTokenAt(issuedAt);
        userRepository.save(checkUser);

        return new ApiResponse("OK", "SUCCESS", checkUser);
    }

    public ApiResponse getAllUsers() {
        List<User> users = userRepository.findAll();
        return new ApiResponse("OK", "Success", users);
    }

    public ApiResponse updateUser(String id, User updateUser) {
        if (!userRepository.existsById(id)) {
            return new ApiResponse("ERR", "The user is not defined");
        }
        // updateUser.setId(id);
        User savedUser = userRepository.save(updateUser);
        return new ApiResponse("OK", "SUCCESS", savedUser);
    }

    public ApiResponse getDetailsUser(String id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return new ApiResponse("ERR", "The user is not defined");
        }
        return new ApiResponse("OK", "SUCCESS", user);
    }

    public ApiResponse deleteUser(String userId) {
        if (!userRepository.existsById(userId)) {
            return new ApiResponse("ERR", "The user is not defined");
        }
        userRepository.deleteById(userId);
        return new ApiResponse("OK", "Delete user success");
    }

    public ApiResponse getShippingAddress(String userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return new ApiResponse("ERR", "The user is not defined");
        }
        return new ApiResponse("OK", "SUCCESS", user.getShippingAddress());
    }

    public ApiResponse addShippingAddress(String userId, ShippingAddress shippingAddress) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return new ApiResponse("ERR", "The user is not defined");
        }
        user.getShippingAddress().add(shippingAddress);
        userRepository.save(user);
        return new ApiResponse("OK", "Add shipping address success");
    }
}
