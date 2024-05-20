package org.example.dto.product;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class MessageRes {
    @JsonProperty("product_name")
    private String product_name;

    @JsonProperty("image_real")
    private String image_real;

    @Builder
    public MessageRes(String productName, String image_real){
        this.image_real=image_real;
        this.product_name=productName;
    }
}
