package org.example.dto.send;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class TemplateObject {
    @JsonProperty("object_type")
    private String objType="feed";

    @JsonProperty("content")
    private Content content;

    @Builder
    public TemplateObject(Content content){
        this.content=content;
    }

}
