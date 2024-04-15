package org.example.dto;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
public class ProductFeignRes {
    private boolean success;
    private int soldOutIds;

    @Builder
    public ProductFeignRes(boolean success, int soldOutIds){
        this.soldOutIds=soldOutIds;
        this.success=success;
    }
}
