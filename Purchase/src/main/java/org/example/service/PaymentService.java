package org.example.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.byfrontend.ValidationRequest;
import org.example.dto.exception.MemberContainerException;
import org.example.dto.exception.PaymentClaimAmountMismatchException;
import org.example.dto.forbackend.PaymentsRes;
import org.example.dto.forbackend.PurchaseDto;
import org.example.dto.portone.*;
import org.example.entity.Payment;
import org.example.repository.PaymentRepository;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;


import java.sql.Timestamp;
import java.time.OffsetDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {
    private final WebClient portOneWebClient = WebClient.builder().baseUrl("https://api.portone.io").build();
    //이 portonewebclient는 docker로 올릴떄도 변경하지 않아도 됩니다.

    private final WebClient webClientforMember = WebClient.builder().baseUrl("http://localhost:8080/member").build() ;
    //private final WebClient webClientforMember = WebClient.builder().baseUrl("http://darakbang-member-service-1:8080/member").build() ;

    //이 webclientformember는 docker container화 과정에서 변경해주어야 합니다.

    private final PaymentRepository paymentRepository;


    //portone에서 결제 조회를 하려면, portonetoken이 필요합니다. 해당 token을 가져오는부 입니다.
    //사이트 내부적으로 너무 빨리 갱신하여, 매번 가져오는 형태로 변경하였습니다.
    public Mono<String> getPortOneToken() {
        PortoneTokenRequest portoneTokenRequest = new PortoneTokenRequest("hM546ISQZ7vQ61xw0eTV0hk7GpRDS48Pr92uTBGbCc5z9u4iSC3DiMed3SHBohBQHWj8ZEPHJF6J8VNA");
        //apisecret이 하드코딩되어있다.
        Mono<String> PortOneToken;

        PortOneToken = portOneWebClient
                .post()
                .uri("/login/api-secret")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(portoneTokenRequest))
                .retrieve()
                .bodyToMono(PortoneTokenResponse.class)
                .map(PortoneTokenResponse::getAccessToken);

//        log.info("PortOne 결제 검증 토큰 확보 및 초기화 완료") ;

        return PortOneToken;

    }

    //받은 paymentId로, 결제 정보를 portone에서 받아오는 부 입니다.
    public Mono<PortOnePaymentRecords> getPaymentRecordsByPortOne(String paymentId, String portOneToken)
    {
//        log.info("결제 정보 받아오기 (PortOne에서) 진행");
        return portOneWebClient.get()
                .uri("/payments/{paymentId}", paymentId)
                .header("Authorization", "Bearer " + portOneToken)
                .retrieve()
                .bodyToMono(PortOnePaymentRecords.class);

    }




    //결제정보의 Dateformat을 변경하고, 저장합니다. (RFC 3339 date-time)의 형식을 따릅니다.
    //이를 Timestamp 형태로 변경합니다. (string으로 받아오기 떄문입니다)
    public Timestamp changeDateFormat(String requestAt)
    {
        OffsetDateTime offsetDateTime = OffsetDateTime.parse(requestAt);
        Timestamp requestedAtTimestamp = Timestamp.from(offsetDateTime.toInstant());

        return requestedAtTimestamp;

    }

    //PortOne에 저장된 정보와 , 결제 정보가 일치한지 확인합니다.
    //일치시, 해당 정보를 저장하고 불일치시 결제 취소 요청을 보냅니다.
    public Mono<Boolean> validateandSave (
            PortOnePaymentRecords portOnePaymentRecords,
            String paymentId,
            int frontPaymentClaim,
            String useremail)
    {
        //프론트에서 전달한 결제 정보가 일치한지, portone에서 실제로 했던 결제 금액이 일치한지 확인
        if (portOnePaymentRecords.getAmount().getTotal() == frontPaymentClaim) {
            log.info("결제 정보가 일치합니다. 결제 정보를 저장합니다.");
            //portone에서 제공하는 날짜 type에 따른 교환
            Timestamp purchaseAt = changeDateFormat(portOnePaymentRecords.getRequestedAt()) ;

            Payment payment = Payment.builder()
                    .paymentid(paymentId)
                    .status(portOnePaymentRecords.getStatus())
                    .purchaseat(purchaseAt) // 변환 필요
                    .ordername(portOnePaymentRecords.getOrderName())
                    .totalamount(frontPaymentClaim)
                    .build();

            paymentRepository.save(payment) ; //저장.

            return Mono.just(Boolean.FALSE); //문제없음



        } else {
            log.info("결제 정보가 일치하지 않습니다. 취소 요청을 보냅니다.") ;
            CancelRequest cancelRequest = new CancelRequest("결제 금액과 DB 확인 결과 맞지 않습니다");
            Mono<CancelResponse> cancelResponseMono = portOneWebClient
                    .post()
                    .uri("/payments/{paymentId}/cancel", paymentId)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(BodyInserters.fromValue(cancelRequest))
                    .retrieve()
                    .bodyToMono(CancelResponse.class);

            // 악의적 공격으로 가정, 결제 취소 후 해당 정보 저장.
            Timestamp purchaseAt = changeDateFormat(portOnePaymentRecords.getRequestedAt()) ;

            Payment payment = Payment.builder()
                    .paymentid(paymentId)
                    .status("DENIED")
                    .purchaseat(purchaseAt)
                    .ordername(portOnePaymentRecords.getOrderName())
                    .totalamount(frontPaymentClaim)
                    .build();

            paymentRepository.save(payment);

            //결제 취소 완료. 이후 exception 유발 필요-
            throw new PaymentClaimAmountMismatchException();

        }
    }

    public Mono<PaymentsRes> sendPaymentSuccessRequestToMember(String orderName, String requestedAt, ValidationRequest validationRequest, String email)
    {

        //오류가 없을때
        PurchaseDto purchaseDto = new PurchaseDto();
        purchaseDto.setEmail(email); // 구매자 이메일 설정
        purchaseDto.setTotal_point(validationRequest.getTotal_point());
        purchaseDto.setPayments_list(validationRequest.getPayments_list());
//
//        log.info("포인트 교환, 상품 삭제, 상태 변경 등의 요청을 전송합니다.");


        return webClientforMember.post()
                .uri("/payments")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(purchaseDto))
                .retrieve()
                .onStatus(HttpStatusCode::is5xxServerError, clientResponse -> {
                    WebClient cancelwebClient = WebClient.builder().baseUrl("https://api.portone.io").build();
                    CancelRequest cancelRequest = new CancelRequest("결제를 위한 통신 도중 Member 서버에서 문제 발생") ;

                    //member server 에서 문제가 발생 하면, 결제를 또 취소해 주어야 합니다.

                    Mono<CancelResponse> cancelResponseMono = cancelwebClient
                            .post()
                            .uri("/payments/{paymentId}/cancel", validationRequest.getPayment_id())
                            .contentType(MediaType.APPLICATION_JSON)
                            .body(BodyInserters.fromValue(cancelRequest))
                            .retrieve()
                            .bodyToMono(CancelResponse.class);

                    Timestamp purchaseAt = changeDateFormat(requestedAt) ;

                    Payment cancelpayment = Payment.builder()
                            .paymentid(validationRequest.getPayment_id())
                            .status("CANCELLED")
                            .purchaseat(purchaseAt)
                            .ordername(orderName)
                            .totalamount(validationRequest.getTotal_point())
                            .build();

                    paymentRepository.save(cancelpayment);

                    throw new MemberContainerException();
                })
                .bodyToMono(PaymentsRes.class);

    }


}
