package org.example.service;

import jakarta.activation.DataSource;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.util.ByteArrayDataSource;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.example.dto.exception.CustomMailException;
import org.example.dto.purchase.PaymentsReq;
import org.example.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MailService {

    private final ProductRepository productRepository;
 //   private JavaMailSender javaMailSender; //dev 환경에선 final 제거.
  private final JavaMailSender javaMailSender; //local 환경에서 사용

    @Value("${spring.mail.username}")
    private String mailSenderId ;

    public String sendRealImgEmail(List<PaymentsReq> paymentsReqList, String consumer_email) {
        try {

            for (PaymentsReq paymentReq : paymentsReqList) {
                MimeMessage mimeMessage = javaMailSender.createMimeMessage();
                MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

                // 수신자
                mimeMessageHelper.setTo(consumer_email);
                // 제목
                mimeMessageHelper.setSubject("Darakbang 구매내역입니다.");
                // 본문
                mimeMessageHelper.setText("구매 감사드립니다.");

                // 이미지 ->datasource로 변경.
                URL imageUrl = new URL(productRepository.findImageRealByProductId(paymentReq.getProduct_id()));
                byte[] imageData = IOUtils.toByteArray(imageUrl);
                DataSource dataSource = new ByteArrayDataSource(imageData, "image/jpeg");
                mimeMessageHelper.addAttachment("darakbang.jpg", dataSource);
                // 이메일 발신자 설정
                mimeMessageHelper.setFrom(new InternetAddress(mailSenderId+"@naver.com"));

                // 이메일 보내기
                javaMailSender.send(mimeMessage);
            }
            return "메일 전송 완료되었습니다.";
        } catch (Exception e) {
            throw new CustomMailException();
        }
    }
}