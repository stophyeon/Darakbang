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
            "p.ImageProduct = :imageproduct, p.ImageReal = :imagereal, " +
            "p.categoryId = :categoryid, " +
            "p.expireAt = :expireat " +
            "where p.productId = :productid")
    void updateProduct(@Param("productid") Long productid,
                       @Param("productname") String productName,
                       @Param("price") int price,
                       @Param("imageproduct") byte[] imageProduct,
                       @Param("imagereal") byte[] imageReal,
                       @Param("categoryid") int categoryId,
                       @Param("expireat") LocalDate expireAt);

    Page<Product> findAll(Pageable pageable) ;

    @Query("SELECT p FROM Product p WHERE p.productName Like %:keyword% and p.productId != :productid")
    List<Product> findByProductNameKeyword(@Param("keyword") String keyword,@Param("productid") Long productid);
    //제목과 유사한 키워드에 따라서 검색하는 쿼리입니다.

    @Query("SELECT p FROM Product p WHERE p.categoryId = :categoryid and p.productId != :productid")
    List<Product> findByProductCategory(@Param("categoryid") int categoryid,@Param("productid") Long productid) ;
    //제목 관련 키워드가 없을때를 대비한 것으로, 카테고리 아이디에 따라서 검색합니다.



}
