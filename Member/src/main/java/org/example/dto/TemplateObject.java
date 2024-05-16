package org.example.dto;

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
    public TemplateObject(String title, String image_url, String description, String link){
        this.content.title=title;
        this.content.description=description;
        this.content.image_url=image_url;
        this.content.link=link;

    }
    public static class Content{
        private String title;
        private String image_url;
        private String description;
        private String link;

    }
}
