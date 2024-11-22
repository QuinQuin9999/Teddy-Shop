package com.example.TeddyShopProject.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.TeddyShopProject.DTO.ApiResponse;
import com.example.TeddyShopProject.Entity.Voucher;
import com.example.TeddyShopProject.Repository.VoucherRepo;

@Service
public class VoucherService {

    @Autowired
    private VoucherRepo repo;

    public ApiResponse saveOrUpdate(Voucher voucher) { 
        if (!checkNoOverlap(voucher.getCode(), voucher.getFromDate(), voucher.getToDate())) {
            return new ApiResponse("ERR", "Time range overlaps with existing vouchers");
        }

        Voucher savedVoucher = repo.save(voucher);
        return new ApiResponse("OK", "SUCCESS", savedVoucher);
    }

    public ApiResponse updateVoucher(String _id, Voucher updateVoucher) {
        if (!repo.existsById(_id)) {
            return new ApiResponse("ERR", "The voucher does not exist");
        }

        List<Voucher> conflictingVouchers = repo.isOverlap(
                updateVoucher.getCode(), updateVoucher.getToDate(), updateVoucher.getFromDate());

        for (Voucher voucher : conflictingVouchers) {
            if (!voucher.get_id().equals(_id)) {
                return new ApiResponse("ERR", "Time range overlaps with an existing voucher for the same code");
            }
        }

        updateVoucher.set_id(_id); 
        Voucher savedVoucher = repo.save(updateVoucher);
        return new ApiResponse("OK", "SUCCESS", savedVoucher);
    }

    public ApiResponse deleteVoucher(String _id) {
        if (!repo.existsById(_id)) {
            return new ApiResponse("ERR", "The voucher does not exist");
        }
        repo.deleteById(_id);
        return new ApiResponse("OK", "Deleted successfully");
    }

    public Iterable<Voucher> listAll() {
        return repo.findAll();
    }

    public Voucher getVoucherByID(String _id) {
        return repo.findById(_id).orElse(null);
    }

    public List<Voucher> getVouchersByType(int type) {
        Iterable<Voucher> allVouchers = repo.findAll();
        List<Voucher> filteredVouchers = new ArrayList<>();

        for (Voucher voucher : allVouchers) {
            if (voucher.getType() == type) {
                filteredVouchers.add(voucher);
            }
        }

        return filteredVouchers;
    }

    public List<Voucher> getVouchersByTypeAndValidDate(int type) {
        Iterable<Voucher> allVouchers = repo.findAll(); 
        List<Voucher> filteredVouchers = new ArrayList<>();
        Date currentDate = new Date(); 

        for (Voucher voucher : allVouchers) {
            if (voucher.getType() == type && voucher.getToDate().after(currentDate)) {
                filteredVouchers.add(voucher);
            }
        }

        return filteredVouchers;
    }

////
    public boolean checkNoOverlap(String code, Date fromDate, Date toDate) {
        return repo.isOverlap(code, fromDate, toDate).isEmpty();
    }    
}
