package org.example.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.WishListDto;
import org.example.dto.ProductDto;
import org.example.dto.SuccessRes;
import org.example.entity.WishList;
import org.example.entity.Product;
import org.example.repository.WishListRepository;
import org.example.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class WishListService {
    private final WishListRepository wishListRepository;
    private final ProductRepository productRepository;


    public SuccessRes likeRegistration(String email, Long productId){
        Optional<Product> product = productRepository.findByProductId(productId);
        if (product.isEmpty()){return SuccessRes.builder().message("해당 상품이 없습니다").build();}
        else {
            WishList wishList = WishList.builder()
                    .email(email)
                    .product(product.get())
                    .build();
            wishListRepository.save(wishList);
            return SuccessRes.builder()
                    .message("등록 성공")
                    .productName(product.get().getProductName())
                    .build();
        }
    }
    public WishListDto showLikeProduct(String email){
        Optional<List<WishList>> likeProducts = wishListRepository.findAllByEmail(email);
        if (likeProducts.isEmpty()){return WishListDto.builder().message("좋아요 등록한 물품이 없습니다.").build();}
        else {
            List<Product> products=likeProducts.get().stream().map(WishList::getProduct).toList();
            return WishListDto.builder()
                    .message("등록 상품 조회")
                    .likeProducts(products)
                    .build();
        }
    }
    @Transactional
    public SuccessRes delLikeProduct(String email,Long productId){
        Optional<Product> product = productRepository.findByProductId(productId);
        try{
            wishListRepository.deleteByEmailAndProduct(email,product.get());
            return SuccessRes.builder()
                    .productName(product.get().getProductName())
                    .message("좋아요 등록 상품 삭제 성공")
                    .build();
        } catch (NoSuchElementException exception){
            return SuccessRes.builder()
                    .productName(product.get().getProductName())
                    .message("해당 상품은 좋아요 등록한 상품이 아닙니다.")
                    .build();
        }
    }
}
