package org.example.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
public class SellDto {
    private String email;
    private List<Long> product_id;
}
