package com.example.TeddyShopProject.Controller;

// import java.util.ArrayList;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.example.TeddyShopProject.DTO.ApiResponse;
import com.example.TeddyShopProject.DTO.ErrorResponse;
import com.example.TeddyShopProject.Entity.User;
import com.example.TeddyShopProject.Service.UserService;
import com.example.TeddyShopProject.Util.ShippingAddress;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/user")

public class UserController {

    @Autowired
    private UserService userService;

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @PostMapping("")
    public ResponseEntity<Object> createUser(@RequestBody Map<String, Object> obj) {
        try {
            String username = obj.get("username").toString();
            String email = obj.get("email").toString();
            String phone = obj.get("phone").toString();
            String address = obj.get("address").toString();
            String password = obj.get("password").toString();
            String confirmPassword = obj.get("confirmPassword").toString();
            User existingUsername = userService.findByUsername(username);
            if (existingUsername != null) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ErrorResponse("The username is already", "ERR"));
            }

            User existingEmail = userService.findByEmail(email);
            if (existingEmail != null) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ErrorResponse("The email is already", "ERR"));
            }

            if (username == null || email == null || phone == null || address == null || password == null
                    || confirmPassword == null) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ErrorResponse("The input is required", "ERR"));
            } else if (!isValidEmail(email)) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ErrorResponse("The input is not a email", "ERR"));
            } else if (!password.equals(confirmPassword)) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ErrorResponse("The password is not match confirmPassword", "ERR"));
            }

            ApiResponse createdUser = userService.createUser(new User(username, email, phone, address, password));
            return ResponseEntity.status(HttpStatus.OK).body(createdUser);
        } catch (Exception e) {
            logger.error("Error occurred while creating user", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage(), null));
        }
    }

    @PostMapping("/sign-in")
    public ResponseEntity<Object> loginUser(@RequestBody Map<String, Object> obj) {
        try {
            String email = obj.get("email").toString();
            String password = obj.get("password").toString();
            if (email == null || password == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ErrorResponse("The input is required", "ERR"));
            }

            ApiResponse result = userService.loginUser(email, password);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(e.getMessage(), null));
        }
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<Object> getAllUsers() {
        try {
            ApiResponse users = userService.getAllUsers();
            return ResponseEntity.status(HttpStatus.OK).body(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(e.getMessage(), null));
        }
    }

    @PutMapping("/updateUser/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable("id") String userId, @RequestBody User data) {
        try {
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ErrorResponse("The userId is required", "ERR"));
            }
            ApiResponse response = userService.updateUser(userId, data);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage(), null));
        }
    }

    @GetMapping("/get-details/{id}")
    public ResponseEntity<Object> getDetailsUser(@PathVariable("id") String userId) {
        try {
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ErrorResponse("The userId is required", "ERR"));
            }

            ApiResponse response = userService.getDetailsUser(userId);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage(), null));
        }
    }

    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable("id") String userId) {
        try {
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ErrorResponse("The userId is required", "ERR"));
            }
            ApiResponse response = userService.deleteUser(userId);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage(), null));
        }
    }

    @GetMapping("/shipping-address")
    public ResponseEntity<Object> getShippingAddress(@RequestBody Map<String, Object> obj) {
        try {
            String userId = obj.get("id").toString();
            ApiResponse shippingAddress = userService.getShippingAddress(userId);
            return ResponseEntity.status(HttpStatus.OK).body(shippingAddress);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(e.getMessage(), null));
        }
    }

    @PostMapping("/shipping-address")
    public ResponseEntity<Object> addShippingAddress(@RequestBody Map<String, Object> obj) {
        try {
            String id = obj.get("id").toString();
            ShippingAddress shippingAddress = (ShippingAddress) obj.get("shippingAddress");
            if (id == null || shippingAddress == null) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ErrorResponse("The userId and shippingAddress are required",
                                "ERR"));
            }

            ApiResponse result = userService.addShippingAddress(id, shippingAddress);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse(e.getMessage(), null));
        }
    }

    private boolean isValidEmail(String email) {
        String emailRegex = "^[\\w]+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }
}
