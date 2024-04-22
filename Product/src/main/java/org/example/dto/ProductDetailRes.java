package org.example.dto;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.example.entity.Product;

import java.util.List;

@Data
@RequiredArgsConstructor
public class ProductDetailRes {
    private Product product;
    private List<Product> productList;

    @Builder
    public ProductDetailRes(Product product, List<Product> productList){
        this.product=product;
        this.productList=productList;
    }
}
