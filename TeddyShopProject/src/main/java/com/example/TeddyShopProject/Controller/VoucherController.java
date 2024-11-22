package com.example.TeddyShopProject.Controller;

import java.util.List;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.TeddyShopProject.DTO.ApiResponse;
import com.example.TeddyShopProject.Entity.Voucher;
import com.example.TeddyShopProject.Service.VoucherService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/voucher")
public class VoucherController {

    @Autowired
    private VoucherService voucherService;

    @PostMapping(value = "/save")
    private ApiResponse saveVoucher(@RequestBody Voucher voucher) {
        return voucherService.saveOrUpdate(voucher);
    }

    @PutMapping("/update/{id}")
    public ApiResponse updateVoucher(@PathVariable(name = "id") String _id, @RequestBody Voucher voucher) {
        return voucherService.updateVoucher(_id, voucher);
    }

    @DeleteMapping("/delete/{id}")// OK
    public ApiResponse deleteVoucher(@PathVariable(name = "id") String _id) {
        voucherService.deleteVoucher(_id);
        return new ApiResponse("OK", "Deleted successfully");
    }

    @GetMapping(value = "/getAll") //OK
    public Iterable<Voucher> getVouchers() {
        return voucherService.listAll();
    }

    @GetMapping("/searchByType") //OK
    private Iterable<Voucher> getVouchersByType(@RequestParam int type) {
        return voucherService.getVouchersByType(type);
    }

    @GetMapping("/searchByTypeAndValid") //OK
    public List<Voucher> getVouchersByTypeAndValid(@RequestParam int type) {
        return voucherService.getVouchersByTypeAndValidDate(type);
    }
}
