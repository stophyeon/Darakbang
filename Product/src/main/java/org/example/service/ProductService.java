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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {
    private final ProductRepository productRepository ;
    private final MemberFeign memberFeign;
    //private final WebClient webClient = WebClient.builder().baseUrl("http://localhost:8080").build();
    public ResponseEntity<SuccessRes> addProduct(ProductDto productDto, String email) {
//        Mono<String> nickName = webClient.get()
//                .uri("/member/{email}", email)
//                .retrieve()
//                .bodyToMono(String.class);
            String nickName= memberFeign.getNickName(email);
            productDto.setNick_name(nickName);
            Product product = Product.ToEntity(productDto,email);
            productRepository.save(product);
            return ResponseEntity.ok(new SuccessRes(product.getProductName(),"success"));
    }

    public ResponseEntity<Page<ProductDto>> findProductPage (int page){
        Pageable pageable = PageRequest.of(page, 3, Sort.by(Sort.Direction.ASC, "productId"));
        Page<Product> productPage = productRepository.findAll(pageable);
        Page<ProductDto> products = productPage.map(ProductDto::ToDto);
        return ResponseEntity.ok(products);
    }

    public ResponseEntity<SuccessRes> deleteProduct(Long productId, String email)
    {
        Product product = productRepository.findByProductId(productId);
        if (product.getUserEmail().equals(email)){
            productRepository.delete(product);
            return ResponseEntity.ok(new SuccessRes(product.getProductName(),"삭제 성공"));
        }
        else {return ResponseEntity.ok(new SuccessRes(product.getProductName(),"등록한 이메일과 일치하지 않습니다."));}
    }

    public ResponseEntity<ProductDto> findProductDetail(Long productId)
    {

        return null;
    }
    @Transactional
    public ResponseEntity<SuccessRes> updateProduct(Long productId, ProductDto productDto,String email)
    {
        Product product=productRepository.findByProductId(productId);
        if (product.getUserEmail().equals(email)){
            productRepository.updateProduct(productId,productDto.getProduct_name(),productDto.getPrice(),
                productDto.getImage_product(), productDto.getImage_real(),
                productDto.getCategory_id(), productDto.getExpire_at());
            return ResponseEntity.ok(new SuccessRes(product.getProductName(),"수정 성공"));
        }
        else {return ResponseEntity.ok(new SuccessRes(product.getProductName(),"등록한 이메일과 일치하지않습니다."));}
    }



}
