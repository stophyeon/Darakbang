package org.example.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class KakaoUser {
    private String email;
    private String image;
    private String nickName;
}
