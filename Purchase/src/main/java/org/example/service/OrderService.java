package org.example.service;

import lombok.RequiredArgsConstructor;
import org.example.dto.OrderSaveRequest;
import org.example.dto.SuccessRes;
import org.example.dtoforportone.ValidationRequest;
import org.example.entity.Order;
import org.example.repository.OrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService {

    private OrderRepository orderRepository;
    //금액부족시 purchas에서 바로 orderservice 저장

    public ResponseEntity saveOrder (ValidationRequest validationRequest, String useremail)
    {
        Order order = Order.builder()
                .productId(validationRequest.getProduct_id())
                .orderPrice(validationRequest.getOriginal_amount())
                .orderAt(validationRequest.getCreated_at())
                .sellerEmail(validationRequest.getSeller_email())
                .consumerEmail(useremail)
                .build();

        orderRepository.save(order) ;

        return ResponseEntity.ok().build();
    }

    //금액이 있어서 저장만 해주면 될때
    public ResponseEntity saveOrderInteract (OrderSaveRequest orderSaveRequest)
    {
        Order order = Order.builder()
                .orderPrice(orderSaveRequest.getProduct_price())
                .orderAt(orderSaveRequest.getCreated_at())
                .consumerEmail(orderSaveRequest.getConsumer())
                .sellerEmail(orderSaveRequest.getSeller())
                .productId(orderSaveRequest.getProduct_id())
                .build() ;

        orderRepository.save(order) ;
        SuccessRes successRes = SuccessRes.builder().message("저장이 완료되었습니다").productName(orderSaveRequest.getProduct_id() + "의")
                .build();

        return ResponseEntity.ok().body(successRes) ;
    }
}
