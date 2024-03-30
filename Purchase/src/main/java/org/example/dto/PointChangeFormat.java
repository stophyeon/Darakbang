package org.example.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PointChangeFormat {
    String email;
    int point;

    // int 타입을 받는 생성자 추가
    public PointChangeFormat(int point) {
        this.point = point;
    }
}

