package org.example.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.ProductDto;
import org.example.entity.Product;
import org.example.repository.ProductRepository;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SearchService {
    private final ProductRepository productRepository;

    public List<String> autoComplete(String word){
        log.info(word);
        return productRepository.findByProductName(word).stream()
                .map(Product::getProductName)
                .toList();

    }

    public Page<ProductDto> searchProduct(String productName,int page){
        Pageable pageable = PageRequest.of(page, 9, Sort.by(Sort.Direction.ASC, "productName"));
        Page<Product> products=productRepository.findByProductNameAndStateOrderByCreateAtDesc(productName,pageable);

        List<ProductDto> p  = products.stream().map(ProductDto::ToDto).toList();
        log.info(p.toString());
        return new PageImpl<>(p);
    }
}
