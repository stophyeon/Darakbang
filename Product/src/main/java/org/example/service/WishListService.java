package org.example.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.WishListDto;
import org.example.dto.SuccessRes;
import org.example.controller.entity.WishList;
import org.example.controller.entity.Product;
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
                    .productId(productId)
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
            List<Long> productIds = likeProducts.get().stream().map(WishList::getProductId).toList();
            List<Product> products = productRepository.findByProductIdIn(productIds);
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
            wishListRepository.deleteByEmailAndProductId(email,productId);
            return SuccessRes.builder()
                    .productName(product.get().getProductName())
                    .message("좋아요 등록 상품 삭제 성공")
                    .build();
        } catch (NoSuchElementException | NullPointerException exception){
            return SuccessRes.builder()
                    .productName(product.get().getProductName())
                    .message("해당 상품은 좋아요 등록한 상품이 아닙니다.")
                    .build();
        }
    }

    @Transactional
    public List<Long> sellWishList(List<Long> productIds,String email){
        List<Product> products = productRepository.findByProductIdIn(productIds);
        List<Long> productId =products.stream().map(Product::getProductId).toList();
        List<Long> productsSoldOut=productIds.stream().filter(p->!productId.contains(p)).toList();
        log.info(productIds.toString());
        log.info(productsSoldOut.toString());
        for (Long product : productsSoldOut){
            wishListRepository.deleteByEmailAndProductId(email,product);
        }
        return productsSoldOut;
    }
    @Transactional
    public void successPay(List<Long> productIds){
        wishListRepository.deleteByProductIdIn(productIds);
        productRepository.deleteByProductIdIn(productIds);
    }
}
