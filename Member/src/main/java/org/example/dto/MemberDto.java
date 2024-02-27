package org.example.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
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
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "yyyy-MM-dd")
    private Date birth;

    @JsonProperty("nick_name")
    private String nickName;

}
