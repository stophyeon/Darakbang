package org.example.service.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.entity.Product;
import org.example.repository.ProductRepository;
import org.example.service.ProductService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class SchedulerService {
    private final ProductRepository productRepository;

    private final ProductService productService;

    @Transactional
    @Scheduled(fixedRate = Long.MAX_VALUE)
    public void DataCleanAtInit() throws IOException {
        int counttuple = productRepository.countTuple();
        log.info("data cleaning at init.."); //한글이 자꾸 깨져서 보기 쉽게 영어로 했습니다.

        productRepository.updateProductsStateForExpiredProducts();

        if(counttuple > 1000)
        {
            List<Product> deleteProductList = productRepository.findProductsExpiredOrSelled();
            for (Product deleteProduct : deleteProductList) {
                productService.deleteProduct(deleteProduct.getProductId(), deleteProduct.getUserEmail());
            }
            log.info("data more than limit, cleaning start.");
        }

        log.info("data cleaning done");
    }

    @Transactional
    @Scheduled(cron = "0 0 0 * * *") //자정마다 data 정리하는 스케줄러
    public void DataCleanAtMidNight() throws IOException {
        int counttuple = productRepository.countTuple();
        log.info("data cleaning at MidNight..");

        productRepository.updateProductsStateForExpiredProducts();

        if(counttuple > 1000)
        {
            List<Product> deleteProductList = productRepository.findProductsExpiredOrSelled();
            for (Product deleteProduct : deleteProductList) {
                productService.deleteProduct(deleteProduct.getProductId(), deleteProduct.getUserEmail());
            }
            log.info("data more than limit, cleaning start.");
        }
        log.info("data cleaning done");
    }

}

