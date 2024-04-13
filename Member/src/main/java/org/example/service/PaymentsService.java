package org.example.service;



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
import org.springframework.transaction.annotation.Transactional;
import java.util.HashMap;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentsService {

    private final MemberRepository memberRepository;
    private final ProductFeign productFeign;
    private final PurchaseFeign purchaseFeign;

    private final HashMap<String,Integer> sellers = new HashMap<>();

    @Transactional
    public PaymentsRes purchase(PurchaseDto purchaseDto, String email){
        Optional<Member> consumer = memberRepository.findByEmail(email);
        if (consumer.isEmpty()){return PaymentsRes.builder().charge(null).message("등록되지 않은 이메일입니다").build();}

        int consumerPoint=consumer.get().getPoint() - purchaseDto.getTotal_point();
        log.info(String.valueOf(consumerPoint));

        if (purchaseDto.getTotal_point()>consumer.get().getPoint()){return PaymentsRes.builder().charge(true).point(Math.abs(consumerPoint)).message("포인트 충전 필요").build();}
        else {
            memberRepository.updatePoint(consumerPoint,email);
            for (PaymentsReq req : purchaseDto.getPayments_list()){
                req.setConsumer(purchaseDto.getEmail());
                if(!purchaseOne(req)){return PaymentsRes.builder().charge(false).message("상품이 없습니다").build();}
            }
            for (String sellerEmail : sellers.keySet()){
                memberRepository.updatePoint(sellers.get(sellerEmail),sellerEmail);
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
            req.setConsumer(purchaseDto.getEmail());
            if(!purchaseOne(req)){return PaymentsRes.builder().charge(false).message("상품이 없습니다").build();}
        }
        for (String email : sellers.keySet()){
            memberRepository.updatePoint(sellers.get(email),email);
        }
        purchaseFeign.saveOrder(purchaseDto.getPayments_list());
        return PaymentsRes.builder().charge(false).message("구매 성공").build();
    }

    @Transactional
    public boolean purchaseOne(PaymentsReq req){
        Optional<Member> seller = memberRepository.findByEmail(req.getSeller());
            if (seller.isEmpty()){return false;}
        if (sellers.containsKey(seller.get().getEmail())){
            int total = sellers.get(seller.get().getEmail())+ req.getProduct_point();
            log.info(String.valueOf(total));
            sellers.put(seller.get().getEmail(),total);
        }
        else {sellers.put(seller.get().getEmail(),seller.get().getPoint()+ req.getProduct_point());}
        return productFeign.changeStateSuccess(req.getProduct_id(),-1);
    }

}
