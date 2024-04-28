package org.example.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.wish_list.WishListDto;
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

    @Transactional
    public SuccessRes likeRegistration(String email, Long productId){
        Product product = productRepository.findByProductId(productId);
        if (product.getState()==-1 ||product.getState()==0){return SuccessRes.builder().message("해당 상품이 없습니다").build();}
        else {
            WishList wishList = WishList.builder()
                    .email(email)
                    .product(product)
                    .build();
            wishListRepository.save(wishList);
            return SuccessRes.builder()
                    .message("등록 성공")
                    .productName(product.getProductName())
                    .build();
        }
    }
    public WishListDto showLikeProduct(String email){
        Optional<List<WishList>> likeProducts = wishListRepository.findAllByEmail(email);
        likeProducts.orElseThrow();
        List<Product> products = likeProducts.get().stream().map(WishList::getProduct).toList();
        return WishListDto.builder()
                .message("등록 상품 조회")
                .likeProducts(products)
                .build();
    }

    @Transactional
    public SuccessRes delLikeProduct(String email,Long productId){
        Product product = productRepository.findByProductId(productId);
        if (product.getState()==-1 ||product.getState()==0){
            return SuccessRes.builder()
                    .productName(product.getProductName())
                    .message("판매완료, 기간 만료된 상품")
                    .build();
        }
        wishListRepository.deleteByEmailAndProduct(email,product);
        return SuccessRes.builder()
                .productName(product.getProductName())
                .message("좋아요 등록 상품 삭제 성공")
                .build();

    }

    @Transactional
    public int sellWishList(List<Long> productIds,String email){
        List<Product> products = productRepository.findByProductIdIn(productIds).stream()
                .filter(p->p.getState()==-1 ||p.getState()==0)
                .toList();
        log.info(productIds.toString());

        for (Product product : products){
            wishListRepository.deleteByEmailAndProduct(email,product);
        }
        return products.size();
    }
    @Transactional
    public void successPay(List<Long> productIds){
        List<Product> products=productRepository.findByProductIdIn(productIds);
        wishListRepository.deleteByProductIn(products);

    }
}
