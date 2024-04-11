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
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByProductId(Long id);
    @Transactional
    @Modifying
    @Query("update Product p set p.productName = :productname, " +
            "p.price = :price, " +
            "p.ImageProduct = :imageproduct, p.ImageReal = :imagereal, " +
            "p.categoryId = :categoryid, " +
            "p.expireAt = :expireat " +
            "where p.productId = :productid")
    void updateProduct(@Param("productid") Long productid,
                       @Param("productname") String productName,
                       @Param("price") int price,
                       @Param("imageproduct") String imageProduct,
                       @Param("imagereal") String imageReal,
                       @Param("categoryid") int categoryId,
                       @Param("expireat") LocalDate expireAt);

    Page<Product> findAll(Pageable pageable) ;
    @Query("SELECT p FROM Product p WHERE p.productName Like %:keyword% and p.productId != :product_id")
    List<Product> findByProductNameKeyword(@Param("keyword") String keyword,@Param("product_id") Long productId);
    //제목과 유사한 키워드에 따라서 검색하는 쿼리입니다.


    @Query("SELECT p FROM Product p WHERE p.categoryId = :category_id and p.productId != :product_id")
    List<Product> findByProductCategory(@Param("category_id") int categoryId,@Param("product_id") Long productId) ;

    @Transactional
    @Modifying
    @Query("UPDATE Product p SET p.state = :state WHERE p.productId = :productid")
    void updateState(@Param("state") int state, @Param("productid") Long productId) ;








}
