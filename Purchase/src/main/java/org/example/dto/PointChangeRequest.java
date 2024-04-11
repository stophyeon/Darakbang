package org.example.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PointChangeRequest {

    private String seller ;
    private String consumer;
    private int total_point;
    private Long product_id ;

    @Builder
    public PointChangeRequest (String seller, String consumer, int total_point, Long product_id)
    {
        this.consumer = consumer;
        this.seller = seller;
        this.total_point = total_point ;
        this.product_id = product_id;
    }



}
