
package com.example.TeddyShopProject.Repository;

import com.example.TeddyShopProject.Entity.Voucher;
import java.util.Date;
import java.util.List;
import org.springframework.data.mongodb.repository.Query;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface VoucherRepo extends MongoRepository<Voucher, String> {
    @Query("{ 'code': ?0, '$and': [ " +
       "{ 'toDate': { '$gte': ?1 } }, " + 
       "{ 'fromDate': { '$lte': ?2 } }" + 
       "] }")
List<Voucher> isOverlap(String code, Date fromDate, Date toDate);

}