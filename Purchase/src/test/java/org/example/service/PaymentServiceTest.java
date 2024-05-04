package org.example.service;

import lombok.extern.slf4j.Slf4j;
import org.example.dto.byfrontend.ValidationRequest;
import org.example.dto.exception.AlreadySoldOutException;
import org.example.dto.forbackend.PaymentsReq;
import org.example.dto.forbackend.PaymentsRes;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.atomic.AtomicInteger;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static reactor.core.publisher.Mono.when;

@SpringBootTest
@Slf4j
class PaymentServiceTest {

    @Autowired
    private ThreadPoolTaskExecutor taskExecutor;
    @Autowired
    private PaymentService paymentService; 

    //동시성 발생 상황 -> 결제 창에서는 여러명이 결제가 가능하지만, 해당 상품이 동시 구매임을 확인하는 순간은
    //MEMBER CONTAINER에 요청했을 상황! -> "이미 결제가 완료된 상품입니다" 인 경우.
    @Test
    void multiThreadTesting() throws InterruptedException {

        int totalRequests = 10;
        AtomicInteger successCount = new AtomicInteger(0);
        AtomicInteger failureCount = new AtomicInteger(0);
        CountDownLatch latch = new CountDownLatch(totalRequests);

        ValidationRequest validationRequest = new ValidationRequest();
        validationRequest.setPayment_id("payment-55bdc9a4-1b38-48fc-a812-0ee7014fac9e");
        validationRequest.setTotal_point(1000);
        validationRequest.setCreated_at(LocalDate.parse("2024-04-30"));

        PaymentsReq paymentReq = new PaymentsReq();
        paymentReq.setSeller("jj1234@naver.com");
        paymentReq.setConsumer("dealon25@naver.com");
        paymentReq.setProduct_point(100);
        paymentReq.setProduct_id(1L);
        paymentReq.setPurchase_at(LocalDate.parse("2024-04-30"));
        List<PaymentsReq> paymentsList = Arrays.asList(paymentReq);
        validationRequest.setPayments_list(paymentsList);

        for (int i = 0; i < totalRequests; i++) {
            taskExecutor.execute(() -> {
                Mono<PaymentsRes> result = paymentService.sendPaymentSuccessRequestToMember("사과 제품", "2024-04-13", validationRequest, "jj1234@naver.com","TESTHAHA");
                result.subscribe(
                        paymentRes -> {
                            successCount.incrementAndGet();
                            latch.countDown();
                        },
                        error -> {
                            if (error instanceof AlreadySoldOutException) {
                                failureCount.incrementAndGet();
                            }
                            latch.countDown();
                        }
                );
            });
        }

        latch.await();

        //검증
        assertEquals(1, successCount.get());
        assertEquals(totalRequests - 1, failureCount.get());
    }

}