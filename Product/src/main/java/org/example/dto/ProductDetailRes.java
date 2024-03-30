package org.example.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.example.entity.Product;

import java.util.List;

@Data
@RequiredArgsConstructor
public class ProductDetailRes {
    private Product product;
    private List<Product> productList;
}
