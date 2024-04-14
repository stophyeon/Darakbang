package org.example.dto;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
public class PurchaseDto {
    private boolean success;
    private List<Long> soldOutIds;

    @Builder
    public PurchaseDto(boolean success, List<Long> soldOutIds){
        this.soldOutIds=soldOutIds;
        this.success=success;
    }
}
