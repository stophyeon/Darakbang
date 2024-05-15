package org.example.service;

import jakarta.activation.DataSource;
import jakarta.activation.URLDataSource;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.exception.CustomMailException;
import org.example.dto.purchase.PaymentsReq;
import org.example.repository.ProductRepository;

import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.net.URL;
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

        for (int i = 0; i < paymentsReqList.size(); i++) {

            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            try {
                MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");

                // 수신자
                mimeMessageHelper.setTo(paymentsReqList.get(i).getConsumer());

                // 제목
                mimeMessageHelper.setSubject("Darakbang 구매내역입니다.");

                // 본문
                String realImgUrl = productRepository.findImageRealByProductId(paymentsReqList.get(i).getProduct_id());
                URL url = new URL(realImgUrl);
                DataSource dataSource = new URLDataSource(url);
                mimeMessageHelper.addAttachment("image.jpg", dataSource);
                log.info("{}", url, "urlishere");

                // 이메일 발신자 설정
                mimeMessageHelper.setFrom(new InternetAddress("dealon2580" + "@naver.com"));

                // 이메일 보내기
                javaMailSender.send(mimeMessage);

            } catch (Exception e) {
                throw new CustomMailException(); // 모든 예외를 MailException으로 처리했습니다.
            }


        }

        return "mail 전송 완료되었습니다.";

        }
    }
