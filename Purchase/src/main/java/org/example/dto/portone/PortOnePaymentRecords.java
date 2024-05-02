package org.example.dto.portone;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class PortOnePaymentRecords {
    //portone에게서 받는 결제 세부 정보
    String status;

    String requestedAt;

    PaymentAmount amount;

    String orderName;
}

