package org.example.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class SearchServiceTest {
    @Autowired
    SearchService searchService;
    ExecutorService executorService = Executors.newFixedThreadPool(100);
    CountDownLatch latch = new CountDownLatch(100);
    @Test
    void autoComplete() {

    }

    @Test
    void searchProduct() {
    }
}