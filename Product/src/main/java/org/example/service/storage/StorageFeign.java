package org.example.service.storage;

import lombok.experimental.Delegate;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@Component
@FeignClient(name = "storage",url = "https://storage.googleapis.com/storage/v1/b/")
public interface StorageFeign {

    @DeleteMapping("/darakbang-img/o/{object}")
    public void delImage(@RequestHeader("Authorization") String token, @PathVariable("object") String obj);


}
