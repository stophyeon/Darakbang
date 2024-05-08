package org.example.service.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.repository.ProductRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Slf4j
public class SchedulerService {
    private final ProductRepository productRepository;

    @Transactional
    @Scheduled(fixedRate = Long.MAX_VALUE)
    public void DataCleanAtInit()
    {
        log.info("data cleaning at init..");

        LocalDate nowtime = LocalDate.now();
        productRepository.updateProductsStateForExpiredProducts(nowtime);

        int counttuple = productRepository.countTuple();
        if(counttuple > 5)
        {
            LocalDate localDate = LocalDate.now() ;
            productRepository.deleteProductsExpiredOrSaled();
            log.info("data more than limit, cleaning start.");
        }

        log.info("data cleaning done");
    }
    @Transactional
    @Scheduled(cron = "0 20 * * * *") //시간은 바꿔야 합니다.
    public void DataCleanAtMidnight()
    {
        log.info("data cleaning..");

        LocalDate nowtime = LocalDate.now();
        productRepository.updateProductsStateForExpiredProducts(nowtime);

        int counttuple = productRepository.countTuple();
        if(counttuple > 5)
        {
            LocalDate localDate = LocalDate.now() ;
            productRepository.deleteProductsExpiredOrSaled();
            log.info("data more than limit, cleaning start.");
        }

        log.info("data cleaning done");
    }

}

