package org.example.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.purchase.*;
import org.example.entity.Member;
import org.example.repository.member.MemberRepository;
import org.example.service.purchase.ProductFeign;
import org.example.service.purchase.PurchaseFeign;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
        HashMap<String,Integer> sellers = new HashMap<>();
        List<Long> sellProductId = new ArrayList<>();
        Optional<Member> consumer = memberRepository.findByEmail(email);
        consumer.orElseThrow();

        int consumerPoint=consumer.get().getPoint() - purchaseDto.getTotal_point();
        log.info(String.valueOf(consumerPoint));

        if (purchaseDto.getTotal_point()>consumer.get().getPoint()){return PaymentsRes.builder().charge(true).point(Math.abs(consumerPoint)).message("포인트 충전 필요").build();}
        else {

            log.info("hereisconsuera{}", purchaseDto.getPayments_list().toString());
            for (PaymentsReq req : purchaseDto.getPayments_list()){
                req.setConsumer(email);
                //                req.setConsumer(purchaseDto.getEmail());
                if(!purchaseOne(req,sellers,sellProductId)){return PaymentsRes.builder().charge(false).message("상품이 없습니다").build();}
            }
            log.info(sellProductId.toString());
            log.info(String.valueOf(sellers.size()));
            log.info("hereisconsuerb{}", purchaseDto.getPayments_list().toString());
            ProductFeignRes productFeignRes = productFeign.SoldOut(ProductFeignReq.builder()
                    .product_id(sellProductId)
                    .email(email)
                    .build());

            if (productFeignRes.isSuccess()){
                memberRepository.updatePoint(consumerPoint,email);
                for (String sellerEmail : sellers.keySet()) {
                    memberRepository.updatePoint(sellers.get(sellerEmail), sellerEmail);
                }
                purchaseFeign.saveOrder(purchaseDto.getPayments_list());
                productFeign.SendEmail(purchaseDto.getPayments_list());//메일 전송 요청->product
                //이메일 전송부 추가했습니다.
                return PaymentsRes.builder().charge(false).message("구매 성공").build();
            }
            else {
                log.info(String.valueOf(productFeignRes.getSoldOutIds()));
                memberRepository.updatePoint(consumer.get().getPoint(),email);
                return PaymentsRes.builder()
                        .charge(null)
                        .message("구매하려는 상품중 판매된 상품이 있습니다.")
                        .build();
            }
        }

    }

    @Transactional
    public PaymentsRes purchaseSuccess(PurchaseDto purchaseDto){
        HashMap<String,Integer> sellers = new HashMap<>();
        List<Long> sellProductId = new ArrayList<>();
        Optional<Member> consumer = memberRepository.findByEmail(purchaseDto.getEmail());
        consumer.orElseThrow();
        memberRepository.updatePoint(0,purchaseDto.getEmail());
        for (PaymentsReq req : purchaseDto.getPayments_list()){
            req.setConsumer(purchaseDto.getEmail());
            if(!purchaseOne(req,sellers,sellProductId)){return PaymentsRes.builder().charge(false).message("상품이 없습니다").build();}
        }
        ProductFeignRes productFeignRes = productFeign.SoldOut(ProductFeignReq.builder()
                .product_id(sellProductId)
                .email(purchaseDto.getEmail()).
                build());
        if (productFeignRes.isSuccess()){
            for (String email : sellers.keySet()){
                memberRepository.updatePoint(sellers.get(email),email);
            }
            purchaseFeign.saveOrder(purchaseDto.getPayments_list());
            productFeign.SendEmail(purchaseDto.getPayments_list());//메일 전송 요청->product
            //이메일 전송부 추가했습니다.
            return PaymentsRes.builder().charge(false).message("구매 성공").build();
        }
        else {
            log.info(String.valueOf(productFeignRes.getSoldOutIds()));
            memberRepository.updatePoint(consumer.get().getPoint(),consumer.get().getEmail());
            return PaymentsRes.builder()
                    .charge(null)
                    .message("구매하려는 상품중 판매된 상품이 있습니다.")
                    .build();
        }
    }

    @Transactional
    public boolean purchaseOne(PaymentsReq req,HashMap<String,Integer> sellers,List<Long> sellProductId){
        Optional<Member> seller = memberRepository.findByEmail(req.getSeller());
        if (seller.isEmpty()){return false;}
        if (sellers.containsKey(seller.get().getEmail())){
            int total = sellers.get(seller.get().getEmail())+ req.getProduct_point();
            log.info(String.valueOf(total));
            sellers.put(seller.get().getEmail(),total);
        }
        else {sellers.put(seller.get().getEmail(),seller.get().getPoint()+ req.getProduct_point());}
        sellProductId.add(req.getProduct_id());
        return true;
    }

}
