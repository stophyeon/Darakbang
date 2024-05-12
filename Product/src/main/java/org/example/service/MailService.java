package org.example.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.purchase.PaymentsReq;
import org.example.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
@Service
@RequiredArgsConstructor
@Slf4j
public class MailService {

    private final ProductRepository productRepository;
    private final JavaMailSender javaMailSender;

    public String sendRealImgEmail(List<PaymentsReq> paymentsReqList) {
        //storage service에서, img를 가져오기
        for (int i = 0; i < paymentsReqList.size(); i++) {

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            try {
                MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");

                // 수신자
                mimeMessageHelper.setTo(paymentsReqList.get(i).getConsumer());

                // 제목
                mimeMessageHelper.setSubject("Darakbang 구매내역입니다.");

                // 본문
                String realimg = productRepository.findImageRealByProductId(paymentsReqList.get(i).getProduct_id());
                mimeMessageHelper.setText(realimg, false);


                // 이메일 발신자 설정
                mimeMessageHelper.setFrom(new InternetAddress("dealon2580" + "@naver.com"));

                // 이메일 보내기
                javaMailSender.send(mimeMessage);

            } catch (MessagingException e) {
                throw new RuntimeException(e);
            }


        }

        return "mail 전송 완료되었습니다.";

        }
    }
