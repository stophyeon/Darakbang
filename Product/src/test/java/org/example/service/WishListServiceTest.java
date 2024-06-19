package org.example.service;

import org.example.dto.wish_list.WishListDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class WishListServiceTest {
    @Autowired
    WishListService wishListService;
    @Test
    void showLikeProduct() {
        WishListDto wishListDto =wishListService.showLikeProduct("jihyeon");
        System.out.println(wishListDto.getLikeProducts().size());
        wishListDto.getLikeProducts().forEach(w->System.out.println(w.getProductName()));
    }
}