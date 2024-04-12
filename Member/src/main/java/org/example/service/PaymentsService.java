package org.example.service;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.PaymentsReq;
import org.example.dto.PaymentsRes;
import org.example.dto.PurchaseDto;
import org.example.entity.Member;
import org.example.repository.member.MemberRepository;
import org.example.service.purchase.ProductFeign;
import org.example.service.purchase.PurchaseFeign;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentsService {

    private final MemberRepository memberRepository;
    private final ProductFeign productFeign;
    private final PurchaseFeign purchaseFeign;

    @Transactional
    public PaymentsRes purchase(PurchaseDto purchaseDto, String email){
        Optional<Member> consumer = memberRepository.findByEmail(email);
        if (consumer.isEmpty()){return PaymentsRes.builder().charge(null).message("등록되지 않은 이메일입니다").build();}
        int consumerPoint=consumer.get().getPoint()- purchaseDto.getTotal_point();
        if (purchaseDto.getTotal_point()>consumer.get().getPoint()){return PaymentsRes.builder().charge(true).point(Math.abs(consumerPoint)).message("포인트 충전 필요").build();}
        else {
            memberRepository.updatePoint(consumerPoint,email);
            for (PaymentsReq req : purchaseDto.getPayments_list()){
                if (req.getSeller().isEmpty()){return PaymentsRes.builder().charge(null).message("회원가입후에 이용가능합니다.").build();}
                else {
                    Optional<Member> seller = memberRepository.findByEmail(req.getSeller());
                    if(seller.isPresent()){
                        int sellerPoint=seller.get().getPoint()+ req.getProduct_point();
                        boolean complete = productFeign.changeStateSuccess(req.getProduct_id(),-1);
                        if (complete){
                            memberRepository.updatePoint(sellerPoint,seller.get().getEmail());
                            req.setConsumer(email);
                        }
                        else {
                            return PaymentsRes.builder().charge(false).message("상품이 없습니다").build();
                        }
                    }
                    else {
                        return PaymentsRes.builder().charge(null).message("판매자가 없는 상품입니다").build();
                    }
                }
            }
        }
        purchaseFeign.saveOrder(purchaseDto.getPayments_list());
        return PaymentsRes.builder().charge(false).message("구매 성공").build();
    }
    @Transactional
    public PaymentsRes purchaseSuccess(PurchaseDto purchaseDto){
        Optional<Member> consumer = memberRepository.findByEmail(purchaseDto.getEmail());
        if (consumer.isEmpty()){return PaymentsRes.builder().charge(null).message("등록되지 않은 이메일입니다").build();}
        memberRepository.updatePoint(0,purchaseDto.getEmail());
        for (PaymentsReq req : purchaseDto.getPayments_list()){
            if (req.getSeller().isEmpty()){return PaymentsRes.builder().charge(null).message("등록되지 않은 이메일입니다").build();}
            else {
                Optional<Member> seller = memberRepository.findByEmail(req.getSeller());
                if (seller.isEmpty()){return PaymentsRes.builder().charge(null).message("판매자가 없는 상품입니다.").build();}
                int sellerPoint=seller.get().getPoint()+ req.getProduct_point();
                boolean complete = productFeign.changeStateSuccess(req.getProduct_id(),-1);
                if (complete){
                    memberRepository.updatePoint(sellerPoint,seller.get().getEmail());
                    req.setConsumer(purchaseDto.getEmail());
                }
                else {
                    return PaymentsRes.builder().charge(false).message("상품이 없습니다").build();
                }
            }
        }
        purchaseFeign.saveOrder(purchaseDto.getPayments_list());
        return PaymentsRes.builder().charge(false).message("구매 성공").build();
    }

}
