package org.example.repository;

import org.example.entity.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findByProductId(Long id);


    @Transactional
    @Modifying
    @Query("update Product p set p.productname = :productname, " +
            "p.price = :price, p.pmessage = :pmessage," +
            "p.createat = :createat," +
            "p.categoryid = :categoryid," +
            "p.soldout = :soldout, p.useremail = :useremail " +
            "where p.productId = :productid")
    void updateProduct(@Param("productid") Long productid,
                       @Param("productname") String productname,
                       @Param("price") int price,
                       @Param("pmessage") String pmessage,
                       @Param("createat") Date createat,
                       @Param("categoryid") int categoryid,
                       @Param("soldout") boolean soldout,
                       @Param("useremail") String useremail);

}
