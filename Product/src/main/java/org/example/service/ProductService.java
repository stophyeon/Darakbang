package org.example.service;

import org.example.dto.SuccessRes;
import org.example.dto.ProductDto;
import org.example.entity.Product;
import org.example.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.service.member.MemberFeign;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {
    private final ProductRepository productRepository ;
    private final MemberFeign memberFeign;
    public ResponseEntity<SuccessRes> addProduct(ProductDto productDto, String email) {
            String nickName= memberFeign.getNickName(email);
            productDto.setNick_name(nickName);
            Product product = Product.ToEntity(productDto,email);
            productRepository.save(product);
            return ResponseEntity.ok(new SuccessRes(product.getProductName(),"success"));
    }



    public ResponseEntity<Page<ProductDto>> findProductPage (int page){
        Pageable pageable = PageRequest.of(page, 9, Sort.by(Sort.Direction.ASC, "productId"));
        Page<Product> productPage = productRepository.findAll(pageable);
        Page<ProductDto> products = productPage.map(ProductDto::ToDto);
        return ResponseEntity.ok(products);
    }

    public ResponseEntity<SuccessRes> deleteProduct(Long productId, String email){
        return null;
    }

    public ResponseEntity<ProductDto> findProductDetail(Long productId)
    {
        return null;
    }

    public ResponseEntity updateProduct(Long productId, ProductDto productDto,String email)
    {

        return null;
    }



}
