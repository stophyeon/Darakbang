package org.example.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@RequiredArgsConstructor
public class MemberDto {
    @Email
    private String email;

    private String name;

    private String password;

    @JsonProperty("phone_num")
    private String phoneNumber;
    private String image;

    @JsonProperty("nick_name")
    private String nickName;
    @Builder
    public MemberDto(String email, String nickName){
        this.email=email;
        this.nickName=nickName;
    }

}
