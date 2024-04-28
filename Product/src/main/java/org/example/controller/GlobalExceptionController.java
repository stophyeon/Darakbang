package org.example.controller;

import org.example.dto.exception.ExceptionRes;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class GlobalExceptionController {
    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<ExceptionRes> NullPointerException(NullPointerException n) {
        ExceptionRes response = new ExceptionRes("잘못된 형식의 요청", n.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IOException.class)
    public ResponseEntity<ExceptionRes> IOException(IOException e){
        ExceptionRes response = new ExceptionRes("현재 이미지 저장 공간 부족", e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.SERVICE_UNAVAILABLE);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ExceptionRes> NoSuchElementException(NoSuchElementException e){
        ExceptionRes response = new ExceptionRes("요청 상품이 존재하지 않음", e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}
