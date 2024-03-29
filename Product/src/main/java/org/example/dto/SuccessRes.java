package org.example.dto;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class SuccessRes {
    private String productName;
    private String message;
    @Builder
    public SuccessRes(String productName, String message){
        this.message=message;
        this.productName=productName;
    }
}
