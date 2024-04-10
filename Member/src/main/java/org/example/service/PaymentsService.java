package org.example.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.PaymentsReq;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentsService {
    private final MemberService memberService;
    public String purchase(PaymentsReq paymentsReq){
        return "";
    }
}
