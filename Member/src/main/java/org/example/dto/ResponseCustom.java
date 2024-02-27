package org.example.dto;

import lombok.Builder;
import lombok.Data;

@Data
public class ResponseCustom {
    private String state;
    private String message;

    @Builder
    public ResponseCustom(String state,String message){
        this.state=state;
        this.message=message;
    }
}
