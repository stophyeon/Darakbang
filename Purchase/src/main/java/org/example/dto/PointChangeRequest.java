package org.example.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class PointChangeRequest {

    private String consumer ;
    private List<Payments> paymentsList;
    @Builder
    public PointChangeRequest (String consumer, List<Payments> paymentsList)
    {
        this.consumer = consumer;
        this.paymentsList = paymentsList;
    }



}
