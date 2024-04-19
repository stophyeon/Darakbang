package org.example.service;
import org.example.dto.ProductDto;
import org.example.dto.SuccessRes;
import org.example.entity.Product;
import org.example.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDate;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicReference;

import static org.junit.Assert.assertTrue;


@SpringBootTest
class ProductServiceTest {
    @Autowired
    private ProductService productService;
    @Autowired
    private ProductRepository productRepository;
    ExecutorService executorService = Executors.newFixedThreadPool(2);
    CountDownLatch latch = new CountDownLatch(2);
    @BeforeEach
    void setUp() {
        productRepository.save(Product.builder().productName("커피").userEmail("j6778@naver.com").build());
    }
    @Test

    void MultiThread() throws IOException, InterruptedException {
        SuccessRes result1 = new SuccessRes();
        AtomicBoolean result2 = new AtomicBoolean();

        ProductDto dto = ProductDto.builder()
                .product_name("딸기")
                .build();
        executorService.execute(()->{
            try {
                productService.updateProduct(1L,dto,"j6778@naver.com");
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            latch.countDown();
        });

        executorService.execute(()->{
            result2.set(productService.findProductDetail(1L).getProduct().getProductName().equals("딸기"));
            latch.countDown();
        });
        latch.await();
        System.out.println(result2.get());

    }


}