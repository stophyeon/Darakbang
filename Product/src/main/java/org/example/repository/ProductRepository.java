package org.example.repository;

import jakarta.persistence.LockModeType;
import org.example.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Product findByProductId(Long id);

    @Modifying
    @Query("update Product p set p.productName = :product_name, " +
            "p.price = :price, " +
            "p.ImageProduct = :image_product, p.ImageReal = :image_real, " +
            "p.categoryId = :category_id, " +
            "p.expireAt = :expire_at " +
            "where p.productId = :product_id")
    void updateProduct(@Param("product_id") Long productId,
                       @Param("product_name") String productName,
                       @Param("price") int price,
                       @Param("category_id") int categoryId,
                       @Param("expire_at") LocalDate expireAt,
                       @Param("image_product") String imageProduct,
                       @Param("image_real") String imageReal);

    Page<Product> findAll(Pageable pageable);

    Page<Product> findAllByNickName(Pageable pageable,String nickName) ;

    @Query("SELECT p FROM Product p WHERE p.productName Like %:keyword% and p.productId != :product_id")
    List<Product> findByProductNameKeyword(@Param("keyword") String keyword,@Param("product_id") Long productId);
    //제목과 유사한 키워드에 따라서 검색하는 쿼리입니다.


    @Query("SELECT p FROM Product p WHERE p.categoryId = :category_id and p.productId != :product_id")
    List<Product> findByProductCategory(@Param("category_id") int categoryId,@Param("product_id") Long productId,Pageable pageable);


    @Modifying
    @Query("UPDATE Product p SET p.state = :state WHERE p.productId = :productid")
    void updateState(@Param("state") int state, @Param("productid") Long productId) ;

    List<Product> findByProductIdIn(List<Long> productIds);

    void deleteByProductIdIn(List<Long> productIds);

    @Query("SELECT p FROM Product p WHERE p.productName LIKE %:productName% AND p.state = 1 ORDER BY p.createAt DESC")
    Page<Product> findByProductNameAndStateOrderByCreateAtDesc(@Param("productName") String productName, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.productName LIKE %:productName%")
    List<Product> findByProductName(@Param("productName") String productName);




    @Query("select count(*) from Product p ")
    int countTuple() ; //Product 인스턴스 수 세기

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("UPDATE Product p SET p.state = 0 where expireAt >= :nowtime")
    void updateProductsStateForExpiredProducts(LocalDate nowtime) ;

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Modifying
    @Query("delete from Product p where p.state in (-1,0)")
    void deleteProductsExpiredOrSaled(); //현재 DB에 저장된 DATA가 너무 많다면(1000개 기준), 만료, 판매된걸 자동 삭제합니다.




}
