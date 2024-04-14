package org.example.dto;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.example.controller.entity.Product;

import java.util.List;

@Data
@RequiredArgsConstructor
public class WishListDto {
    private String message;
    private List<Product> likeProducts;
    @Builder
    public WishListDto(String message, List<Product> likeProducts){
        this.likeProducts=likeProducts;
        this.message=message;
    }
}
