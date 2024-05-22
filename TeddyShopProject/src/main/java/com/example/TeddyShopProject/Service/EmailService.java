package com.example.TeddyShopProject.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.TeddyShopProject.DTO.ApiResponse;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public ApiResponse sendEmail(String email, String newPassword) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("21521374@gm.uit.edu.vn");
        message.setTo(email);
        message.setSubject("GearShop: Mật khẩu mới");
        message.setText(
                "Cảm ơn bạn vì đã lựa chọn cửa hàng chúng tôi! Mật khẩu mới cho tài khoản của bạn là: " + newPassword);
        mailSender.send(message);
        return new ApiResponse("OK", "SUCCESS", message);
    }
}
