package org.example.repository;

import org.example.entity.Product;
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
    Product findByProductId(Long id);

    @Modifying
    @Query("update Product p set p.productName = :productname, " +
            "p.price = :price, " +
            "p.ImageProduct = :imageproduct, p.ImageReal = :imagereal, " +
            "p.categoryId = :categoryid, " +
            "p.expireAt = :expireat " +
            "where p.productId = :productid")
    //@Lock(LockModeType.PESSIMISTIC_WRITE)
    void updateProduct(@Param("productid") Long productid,
                       @Param("productname") String productName,
                       @Param("price") int price,
                       @Param("categoryid") int categoryId,
                       @Param("expireat") LocalDate expireAt);

    Page<Product> findAll(Pageable pageable);
    Page<Product> findAllByNickName(Pageable pageable,String nickName) ;
    //@Lock(LockModeType.PESSIMISTIC_READ)
    @Query("SELECT p FROM Product p WHERE p.productName Like %:keyword% and p.productId != :product_id")
    List<Product> findByProductNameKeyword(@Param("keyword") String keyword,@Param("product_id") Long productId);
    //제목과 유사한 키워드에 따라서 검색하는 쿼리입니다.

    //@Lock(LockModeType.PESSIMISTIC_READ)
    @Query("SELECT p FROM Product p WHERE p.categoryId = :category_id and p.productId != :product_id")
    List<Product> findByProductCategory(@Param("category_id") int categoryId,@Param("product_id") Long productId);

    //@Lock(LockModeType.PESSIMISTIC_WRITE)
    @Modifying
    @Query("UPDATE Product p SET p.state = :state WHERE p.productId = :productid")
    void updateState(@Param("state") int state, @Param("productid") Long productId) ;

    List<Product> findByProductIdIn(List<Long> productIds);

    void deleteByProductIdIn(List<Long> productIds);

    @Query("SELECT p FROM Product p WHERE p.productName LIKE %:productName% AND p.state = 1 ORDER BY p.createAt DESC")
    Page<Product> findByProductNameAndStateOrderByCreateAtDesc(@Param("productName") String productName, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.productName LIKE %:productName%")
    List<Product> findByProductName(@Param("productName") String productName);








}
