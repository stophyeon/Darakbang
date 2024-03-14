package org.example.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "포인트")
public class PointRequest {
    @Schema(description = "이메일")
    private String email;
    @Schema(description = "구매 포인트")
    private int point;
}
