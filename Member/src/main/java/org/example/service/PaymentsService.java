package org.example.service;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.PaymentsReq;
import org.example.dto.PaymentsRes;
import org.example.entity.Member;
import org.example.repository.member.MemberRepository;
import org.example.service.purchase.ProductFeign;
import org.example.service.purchase.PurchaseFeign;
import org.springframework.stereotype.Service;

import java.util.Optional;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.PaymentsReq;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentsService {

    private final MemberRepository memberRepository;
    private final ProductFeign productFeign;
    private final PurchaseFeign purchaseFeign;

    @Transactional
    public PaymentsRes purchase(PaymentsReq paymentsReq, String email){
        Optional<Member> consumer = memberRepository.findByEmail(email);
        Optional<Member> seller = memberRepository.findByEmail(paymentsReq.getSeller());
        if (consumer.isEmpty()|| seller.isEmpty()){return PaymentsRes.builder().charge(null).message("등록되지 않은 이메일입니다").build();}
        else {
            int consumerPoint=consumer.get().getPoint()-paymentsReq.getTotal_point();
            int sellerPoint=seller.get().getPoint()+paymentsReq.getTotal_point();
            if (consumerPoint<0){
                return PaymentsRes.builder().charge(true).point(Math.abs(consumerPoint)).message("포인트 충전 필요").build();
            }
            else{
                boolean complete = productFeign.changeStateSuccess(paymentsReq.getProduct_id(),-1);
                if (complete){
                    memberRepository.updatePoint(consumerPoint,email);
                    memberRepository.updatePoint(sellerPoint,seller.get().getEmail());
                    paymentsReq.setConsumer(email);
                    purchaseFeign.saveOrder(paymentsReq);
                    return PaymentsRes.builder().charge(false).message("구매 성공").build();
                }
                else {

                    return PaymentsRes.builder().charge(false).message("상품이 없습니다").build();
                }
            }
        }

    }
    @Transactional
    public PaymentsRes purchaseSuccess(PaymentsReq paymentsReq){
        Optional<Member> consumer = memberRepository.findByEmail(paymentsReq.getConsumer());
        Optional<Member> seller = memberRepository.findByEmail(paymentsReq.getSeller());
        if (consumer.isEmpty()|| seller.isEmpty()){return PaymentsRes.builder().charge(null).message("등록되지 않은 이메일입니다").build();}
        else {
            int sellerPoint = seller.get().getPoint()+ paymentsReq.getTotal_point();
            boolean complete = productFeign.changeStateSuccess(paymentsReq.getProduct_id(),-1);
            if (complete){
                memberRepository.updatePoint(0,paymentsReq.getConsumer());
                memberRepository.updatePoint(sellerPoint,seller.get().getEmail());
                purchaseFeign.saveOrder(paymentsReq);
                return PaymentsRes.builder().charge(false).message("구매 성공").build();
            }
            else {

                return PaymentsRes.builder().charge(false).message("상품이 없습니다").build();
            }

        }

    }

}
