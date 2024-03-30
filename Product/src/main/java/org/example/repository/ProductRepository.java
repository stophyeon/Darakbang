package org.example.repository;

import org.example.entity.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findByProductId(Long id);
    @Transactional
    @Modifying
    @Query("update Product p set p.productName = :productname, " +
            "p.price = :price, " +
            "p.imageProduct = :imageproduct, p.imageReal = :imagereal, " +
            "p.createAt = :updateat, " +
            "p.state = :state, p.categoryId = :categoryid, " +
            "p.expireAt = :expireat " +
            "where p.productId = :productid")
    void updateProduct(@Param("productname") String productName,
                       @Param("price") int price,
                       @Param("imageproduct") byte[] imageProduct,
                       @Param("imagereal") byte[] imageReal,
                       @Param("categoryid") int categoryId,
                       @Param("expireat") LocalDate expireAt);

    Page<Product> findAll(Pageable pageable) ;

}
